from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from datetime import datetime

from database import get_db
from models import (
    HarvestRecord as HarvestRecordModel,
    Block as BlockModel,
    Employee as EmployeeModel,
)
from schemas import HarvestRecord, HarvestRecordCreate
from auth import get_current_active_user

router = APIRouter()


@router.post("/", response_model=HarvestRecord)
def create_harvest(
    harvest: HarvestRecordCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    # Validate block exists
    block = db.query(BlockModel).filter(BlockModel.id == harvest.block_id).first()
    if not block:
        raise HTTPException(status_code=404, detail="Block not found")

    # Validate harvester exists
    harvester = (
        db.query(EmployeeModel).filter(EmployeeModel.id == harvest.harvester_id).first()
    )
    if not harvester:
        raise HTTPException(status_code=404, detail="Harvester not found")

    # Generate batch code
    date_str = harvest.date.strftime("%Y%m%d")
    batch_code = f"LOT-{date_str}-{str(uuid.uuid4())[:8].upper()}"

    db_harvest = HarvestRecordModel(**harvest.dict(), batch_code=batch_code)
    db.add(db_harvest)
    db.commit()
    db.refresh(db_harvest)
    return db_harvest


@router.get("/", response_model=List[HarvestRecord])
def read_harvests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    harvests = db.query(HarvestRecordModel).offset(skip).limit(limit).all()
    return harvests


@router.get("/{harvest_id}", response_model=HarvestRecord)
def read_harvest(
    harvest_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    harvest = (
        db.query(HarvestRecordModel).filter(HarvestRecordModel.id == harvest_id).first()
    )
    if harvest is None:
        raise HTTPException(status_code=404, detail="Harvest record not found")
    return harvest


@router.get("/trace/{batch_code}", response_model=HarvestRecord)
def trace_batch(batch_code: str, db: Session = Depends(get_db)):
    """Public endpoint for tracing batch codes"""
    harvest = (
        db.query(HarvestRecordModel)
        .filter(HarvestRecordModel.batch_code == batch_code)
        .first()
    )
    if harvest is None:
        raise HTTPException(status_code=404, detail="Batch not found")
    return harvest


@router.get("/block/{block_id}", response_model=List[HarvestRecord])
def read_harvests_by_block(
    block_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    harvests = (
        db.query(HarvestRecordModel)
        .filter(HarvestRecordModel.block_id == block_id)
        .all()
    )
    return harvests
