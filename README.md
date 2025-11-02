# FAP Agri - Farm Management System

**Sistem manajemen perkebunan kelapa sawit modern dan komprehensif untuk FAP Agri**

FAP Agri adalah platform digital yang dirancang khusus untuk mengelola operasional perkebunan kelapa sawit secara efisien. Sistem ini menggabungkan teknologi web modern dengan kebutuhan spesifik industri palm oil, mulai dari pencatatan panen hingga traceability batch untuk memenuhi standar RSPO.

**Stack Teknologi:**
- **Backend**: FastAPI (Python) + SQLAlchemy + JWT Authentication
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Docker-ready untuk scalability

## � Keunggulan Aplikasi

✅ **Mudah Digunakan**: Interface intuitif untuk semua level pengguna  
✅ **Real-time Tracking**: Pencatatan panen dengan GPS coordinates  
✅ **Batch Traceability**: Pelacakan lot dari kebun hingga pabrik  
✅ **Role-based Access**: Kontrol akses sesuai jabatan (admin, agronomist, field worker)  
✅ **Mobile-Friendly**: Responsive design untuk penggunaan di lapangan  
✅ **API-First**: Arsitektur modular untuk integrasi dengan sistem lain  

## �🌟 Fitur Utama

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

## 🔮 Roadmap & Development

### Saat Ini (v1.0) ✅
- ✅ Manajemen perkebunan dan blok
- ✅ Pencatatan harvest dengan batch tracking
- ✅ Dashboard analytics dan reporting
- ✅ Authentication & user management
- ✅ Responsive web interface

### Selanjutnya (v2.0) 🔄
- 📱 Progressive Web App (PWA) untuk offline capability
- 📊 Advanced analytics dengan visualisasi data
- 🗂️ File upload untuk dokumentasi kebun
- 🔔 Notification system untuk alert penting
- 🗺️ Integrasi mapping dengan Leaflet/OpenStreetMap

### Masa Depan (v3.0+) 🚀
- 🛰️ IoT sensor integration untuk monitoring real-time
- 🤖 Machine Learning untuk prediksi yield
- 📱 Mobile app native (React Native)
- 🌐 Supply chain integration ke pabrik pengolahan
- 📋 RSPO certification tracking automation

## 💡 Use Cases

**Untuk Manager Perkebunan:**
- Monitor performance seluruh area perkebunan
- Analisis produktivitas per blok dan periode
- Laporan compliance untuk audit RSPO

**Untuk Mandor/Supervisor:**
- Input data panen harian dari lapangan
- Tracking performance tim panen
- Koordinasi aktivitas di multiple blok

**Untuk Field Worker:**
- Record harvest dengan smartphone/tablet
- GPS tagging untuk akurasi lokasi
- Simple interface untuk input cepat

## 🔮 Next Steps

- Blocks management (sub-areas)
- File upload untuk dokumentasi
- IoT sensor integration
- Mobile app development
- Advanced analytics