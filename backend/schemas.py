from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# Plantation schemas
class PlantationBase(BaseModel):
    name: str
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    area_ha: Optional[float] = None
    address: Optional[str] = None


class PlantationCreate(PlantationBase):
    pass


class PlantationUpdate(PlantationBase):
    name: Optional[str] = None


class Plantation(PlantationBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Block schemas
class BlockBase(BaseModel):
    name: str
    plantation_id: str
    area_ha: Optional[float] = None
    planting_year: Optional[int] = None


class BlockCreate(BlockBase):
    pass


class BlockUpdate(BlockBase):
    name: Optional[str] = None
    plantation_id: Optional[str] = None


class Block(BlockBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Employee schemas
class EmployeeBase(BaseModel):
    name: str
    employee_code: str
    position: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool = True


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    name: Optional[str] = None
    employee_code: Optional[str] = None


class Employee(EmployeeBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Harvest Record schemas
class HarvestRecordBase(BaseModel):
    block_id: str
    harvester_id: str
    date: datetime
    tonnes_fresh_fruit_bunches: float
    geo_lat: Optional[float] = None
    geo_lng: Optional[float] = None
    notes: Optional[str] = None


class HarvestRecordCreate(HarvestRecordBase):
    pass


class HarvestRecord(HarvestRecordBase):
    id: str
    batch_code: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# User schemas
class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    role: str = "field_worker"
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    username: Optional[str] = None
    email: Optional[str] = None


class User(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Dashboard schemas
class DashboardStats(BaseModel):
    total_plantations: int
    total_blocks: int
    total_harvest_today: float
    total_harvest_this_month: float


class PlantationDashboard(BaseModel):
    plantation: Plantation
    total_blocks: int
    total_area_ha: float
    harvest_this_month: float
    recent_harvests: List[HarvestRecord]
