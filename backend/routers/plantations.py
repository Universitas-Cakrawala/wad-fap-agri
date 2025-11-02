from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from database import get_db
from models import Plantation as PlantationModel
from schemas import Plantation, PlantationCreate, PlantationUpdate
from auth import get_current_active_user

router = APIRouter()


@router.post("/", response_model=Plantation)
def create_plantation(
    plantation: PlantationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    db_plantation = PlantationModel(**plantation.dict())
    db.add(db_plantation)
    db.commit()
    db.refresh(db_plantation)
    return db_plantation


@router.get("/", response_model=List[Plantation])
def read_plantations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    plantations = db.query(PlantationModel).offset(skip).limit(limit).all()
    return plantations


@router.get("/{plantation_id}", response_model=Plantation)
def read_plantation(
    plantation_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    plantation = (
        db.query(PlantationModel).filter(PlantationModel.id == plantation_id).first()
    )
    if plantation is None:
        raise HTTPException(status_code=404, detail="Plantation not found")
    return plantation


@router.put("/{plantation_id}", response_model=Plantation)
def update_plantation(
    plantation_id: str,
    plantation: PlantationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    db_plantation = (
        db.query(PlantationModel).filter(PlantationModel.id == plantation_id).first()
    )
    if db_plantation is None:
        raise HTTPException(status_code=404, detail="Plantation not found")

    update_data = plantation.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_plantation, field, value)

    db.commit()
    db.refresh(db_plantation)
    return db_plantation


@router.delete("/{plantation_id}")
def delete_plantation(
    plantation_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    db_plantation = (
        db.query(PlantationModel).filter(PlantationModel.id == plantation_id).first()
    )
    if db_plantation is None:
        raise HTTPException(status_code=404, detail="Plantation not found")

    db.delete(db_plantation)
    db.commit()
    return {"message": "Plantation deleted successfully"}
