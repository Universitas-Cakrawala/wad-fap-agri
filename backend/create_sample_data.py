from sqlalchemy.orm import Session
from database import SessionLocal
from models import Plantation, Block, Employee, HarvestRecord
from datetime import datetime, timedelta
import uuid


def create_sample_data():
    db = SessionLocal()
    try:
        # Check if sample data already exists
        if db.query(Plantation).count() > 0:
            print("ℹ️ Sample data already exists!")
            return

        print("🌱 Creating sample plantation data...")

        # Create sample plantations
        plantation1 = Plantation(
            name="Kebun Sawit Utama",
            location_lat=-2.5489,
            location_lng=117.8924,
            area_ha=150.5,
            address="Kalimantan Tengah, Indonesia",
        )
        plantation2 = Plantation(
            name="Kebun Sawit Selatan",
            location_lat=-3.2345,
            location_lng=118.1234,
            area_ha=87.3,
            address="Kalimantan Selatan, Indonesia",
        )

        db.add(plantation1)
        db.add(plantation2)
        db.commit()
        db.refresh(plantation1)
        db.refresh(plantation2)

        # Create sample blocks
        blocks = [
            Block(
                plantation_id=plantation1.id,
                name="Blok A1",
                area_ha=25.0,
                planting_year=2018,
            ),
            Block(
                plantation_id=plantation1.id,
                name="Blok A2",
                area_ha=30.5,
                planting_year=2019,
            ),
            Block(
                plantation_id=plantation1.id,
                name="Blok A3",
                area_ha=28.0,
                planting_year=2020,
            ),
            Block(
                plantation_id=plantation2.id,
                name="Blok B1",
                area_ha=22.3,
                planting_year=2017,
            ),
            Block(
                plantation_id=plantation2.id,
                name="Blok B2",
                area_ha=35.0,
                planting_year=2018,
            ),
        ]

        for block in blocks:
            db.add(block)
        db.commit()

        # Create sample employees
        employees = [
            Employee(
                name="Ahmad Subandi",
                employee_code="EMP001",
                position="Mandor",
                phone="081234567890",
            ),
            Employee(
                name="Siti Rahayu",
                employee_code="EMP002",
                position="Pemanen",
                phone="081234567891",
            ),
            Employee(
                name="Budi Santoso",
                employee_code="EMP003",
                position="Pemanen",
                phone="081234567892",
            ),
            Employee(
                name="Wati Suryani",
                employee_code="EMP004",
                position="Supervisor",
                phone="081234567893",
            ),
        ]

        for employee in employees:
            db.add(employee)
        db.commit()

        # Create sample harvest records
        base_date = datetime.now() - timedelta(days=30)

        sample_harvests = []
        for i in range(15):
            harvest_date = base_date + timedelta(days=i * 2)
            batch_code = (
                f"LOT-{harvest_date.strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
            )

            harvest = HarvestRecord(
                block_id=blocks[i % len(blocks)].id,
                harvester_id=employees[i % len(employees)].id,
                date=harvest_date,
                tonnes_fresh_fruit_bunches=round(2.5 + (i % 3) * 1.2, 2),
                batch_code=batch_code,
                geo_lat=-2.5489 + (i * 0.001),
                geo_lng=117.8924 + (i * 0.001),
                notes=(
                    f"Harvest normal, cuaca cerah"
                    if i % 2 == 0
                    else "Harvest sedikit terlambat karena hujan"
                ),
            )
            sample_harvests.append(harvest)

        for harvest in sample_harvests:
            db.add(harvest)
        db.commit()

        print("✅ Sample data created successfully!")
        print(f"📊 Created:")
        print(f"   - {len([plantation1, plantation2])} Plantations")
        print(f"   - {len(blocks)} Blocks")
        print(f"   - {len(employees)} Employees")
        print(f"   - {len(sample_harvests)} Harvest Records")

    except Exception as e:
        print(f"❌ Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    create_sample_data()
