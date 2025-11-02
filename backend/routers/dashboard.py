from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date

from database import get_db
from models import (
    Plantation as PlantationModel,
    Block as BlockModel,
    HarvestRecord as HarvestRecordModel,
)
from schemas import DashboardStats, PlantationDashboard
from auth import get_current_active_user

router = APIRouter()


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db), current_user=Depends(get_current_active_user)
):
    # Total plantations
    total_plantations = db.query(PlantationModel).count()

    # Total blocks
    total_blocks = db.query(BlockModel).count()

    # Today's harvest
    today = date.today()
    total_harvest_today = (
        db.query(func.sum(HarvestRecordModel.tonnes_fresh_fruit_bunches))
        .filter(func.date(HarvestRecordModel.date) == today)
        .scalar()
        or 0
    )

    # This month's harvest
    first_day_of_month = today.replace(day=1)
    total_harvest_this_month = (
        db.query(func.sum(HarvestRecordModel.tonnes_fresh_fruit_bunches))
        .filter(HarvestRecordModel.date >= first_day_of_month)
        .scalar()
        or 0
    )

    return DashboardStats(
        total_plantations=total_plantations,
        total_blocks=total_blocks,
        total_harvest_today=float(total_harvest_today),
        total_harvest_this_month=float(total_harvest_this_month),
    )


@router.get("/plantation/{plantation_id}", response_model=PlantationDashboard)
def get_plantation_dashboard(
    plantation_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    # Get plantation
    plantation = (
        db.query(PlantationModel).filter(PlantationModel.id == plantation_id).first()
    )
    if not plantation:
        raise HTTPException(status_code=404, detail="Plantation not found")

    # Get blocks count and total area
    blocks_query = db.query(BlockModel).filter(
        BlockModel.plantation_id == plantation_id
    )
    total_blocks = blocks_query.count()
    total_area_ha = (
        db.query(func.sum(BlockModel.area_ha))
        .filter(BlockModel.plantation_id == plantation_id)
        .scalar()
        or 0
    )

    # Get this month's harvest for this plantation
    first_day_of_month = date.today().replace(day=1)
    harvest_this_month = (
        db.query(func.sum(HarvestRecordModel.tonnes_fresh_fruit_bunches))
        .join(BlockModel, HarvestRecordModel.block_id == BlockModel.id)
        .filter(
            BlockModel.plantation_id == plantation_id,
            HarvestRecordModel.date >= first_day_of_month,
        )
        .scalar()
        or 0
    )

    # Get recent harvests (last 10)
    recent_harvests = (
        db.query(HarvestRecordModel)
        .join(BlockModel, HarvestRecordModel.block_id == BlockModel.id)
        .filter(BlockModel.plantation_id == plantation_id)
        .order_by(HarvestRecordModel.date.desc())
        .limit(10)
        .all()
    )

    return PlantationDashboard(
        plantation=plantation,
        total_blocks=total_blocks,
        total_area_ha=float(total_area_ha),
        harvest_this_month=float(harvest_this_month),
        recent_harvests=recent_harvests,
    )
