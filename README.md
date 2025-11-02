# FAP Agri - Farm Management System

Sistem manajemen perkebunan kelapa sawit yang komprehensif untuk FAP Agri, mencakup backend API dengan FastAPI dan frontend dengan React + Tailwind CSS.

## 🌟 Fitur Utama

### Backend (FastAPI + PostgreSQL)
- **Authentication & Authorization**: JWT-based auth dengan role-based access control
- **Plantation Management**: Manajemen area perkebunan dan blok
- **Harvest Tracking**: Pencatatan hasil panen dengan geolocation dan batch traceability
- **Employee Management**: Manajemen karyawan dan pengguna sistem
- **Dashboard Analytics**: Statistik dan metrik performa perkebunan
- **RESTful API**: OpenAPI/Swagger documentation
- **PostGIS Support**: Spatial data untuk pemetaan area

### Frontend (React + TypeScript + Tailwind)
- **Responsive Design**: Mobile-first design dengan Tailwind CSS
- **Authentication Flow**: Login/logout dengan token management
- **Dashboard**: Overview perkebunan dan statistik harvest
- **Plantation Management**: CRUD operations untuk perkebunan dan blok
- **Harvest Recording**: Form input harvest dengan GPS coordinates
- **Employee Management**: Daftar dan manajemen karyawan
- **Real-time Updates**: Axios interceptors untuk API calls

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- PostgreSQL 13+ dengan PostGIS
- Docker & Docker Compose (opsional)

### Backend Setup

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Setup database**:
```bash
# Install PostgreSQL dan PostGIS
# Atau gunakan Docker
docker run --name fapagri-db -e POSTGRES_DB=fapagri_db -e POSTGRES_USER=fapagri_user -e POSTGRES_PASSWORD=fapagri_pass -p 5432:5432 -d postgis/postgis:15-3.3
```

3. **Create admin user**:
```bash
python create_admin.py
```

4. **Run server**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Run development server**:
```bash
npm start
```

### Docker Setup (Recommended)

```bash
cd backend
docker-compose up -d
```

## 🎯 Demo Credentials

```
Username: admin
Password: admin123
```

## 📁 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Plantations
- `GET /api/v1/plantations/` - List plantations
- `POST /api/v1/plantations/` - Create plantation
- `PUT /api/v1/plantations/{id}` - Update plantation
- `DELETE /api/v1/plantations/{id}` - Delete plantation

### Harvests
- `GET /api/v1/harvests/` - List harvests
- `POST /api/v1/harvests/` - Record harvest
- `GET /api/v1/trace/{batch_code}` - Trace batch (public)

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics

## 🔮 Next Steps

- Blocks management (sub-areas)
- File upload untuk dokumentasi
- IoT sensor integration
- Mobile app development
- Advanced analytics