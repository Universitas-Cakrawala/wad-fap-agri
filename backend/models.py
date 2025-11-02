from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Text,
    Boolean,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()


class Plantation(Base):
    __tablename__ = "plantations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    location_lat = Column(Float)
    location_lng = Column(Float)
    area_ha = Column(Float)
    address = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    blocks = relationship("Block", back_populates="plantation")


class Block(Base):
    __tablename__ = "blocks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    plantation_id = Column(String, ForeignKey("plantations.id"))
    name = Column(String(100), nullable=False)
    area_ha = Column(Float)
    planting_year = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    plantation = relationship("Plantation", back_populates="blocks")
    harvest_records = relationship("HarvestRecord", back_populates="block")


class Employee(Base):
    __tablename__ = "employees"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    employee_code = Column(String(50), unique=True)
    position = Column(String(50))
    phone = Column(String(20))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    harvest_records = relationship("HarvestRecord", back_populates="harvester")


class HarvestRecord(Base):
    __tablename__ = "harvest_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    block_id = Column(String, ForeignKey("blocks.id"))
    harvester_id = Column(String, ForeignKey("employees.id"))
    date = Column(DateTime, nullable=False)
    tonnes_fresh_fruit_bunches = Column(Float)
    batch_code = Column(String(100), unique=True)
    geo_lat = Column(Float)
    geo_lng = Column(Float)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    block = relationship("Block", back_populates="harvest_records")
    harvester = relationship("Employee", back_populates="harvest_records")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    role = Column(String(20), default="field_worker")  # admin, agronomist, field_worker
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
