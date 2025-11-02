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
- **Authentication & Authorization**: JWT-based auth dengan role-based access control ✅
- **Plantation Management**: Manajemen area perkebunan dan blok ✅
- **Harvest Tracking**: Pencatatan hasil panen dengan geolocation dan batch traceability ✅
- **Employee Management**: Manajemen karyawan dan pengguna sistem ✅
- **Dashboard Analytics**: Statistik dan metrik performa perkebunan ✅
- **RESTful API**: OpenAPI/Swagger documentation ✅
- **Sample Data**: Data contoh untuk testing dan demo ✅

### Frontend (React + TypeScript + Tailwind)
- **Responsive Design**: Mobile-first design dengan Tailwind CSS ✅
- **Authentication Flow**: Login/logout dengan token management ✅
- **Dashboard**: Overview perkebunan dan statistik harvest ✅
- **Plantation Management**: CRUD operations untuk perkebunan dan blok ✅
- **Harvest Recording**: Form input harvest dengan GPS coordinates ✅
- **Employee Management**: Daftar dan manajemen karyawan ✅
- **Real-time Updates**: Axios interceptors untuk API calls ✅

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- PostgreSQL 13+ (sudah running di sistem)

### 🎯 Cara Menjalankan (Mudah!)

**1. Jalankan Backend:**
```bash
./start-backend.sh
```

**2. Jalankan Frontend (terminal baru):**
```bash
./start-frontend.sh
```

**3. Akses Aplikasi:**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000
- 📚 **API Docs**: http://localhost:8000/docs

### 🔐 Login Credentials

```
👤 Admin:
   Username: admin
   Password: admin123

👤 Field Worker:
   Username: field1  
   Password: field123
```

### 📊 Sample Data
Aplikasi sudah dilengkapi dengan sample data:
- ✅ 2 Perkebunan (Kebun Sawit Utama & Selatan)
- ✅ 5 Blok perkebunan
- ✅ 4 Karyawan/employees  
- ✅ 15 Record panen dengan batch tracking

## 🎯 Demo Credentials

```
👤 Admin User:
   Username: admin
   Password: admin123
   Role: Administrator (full access)

👤 Field Worker:
   Username: field1  
   Password: field123
   Role: Field Worker (input panen)
```

## ✅ Status Aplikasi

**Backend Status:** 🟢 READY
- ✅ Database tables created
- ✅ User authentication working
- ✅ All API endpoints functional
- ✅ Sample data populated
- ✅ Running on http://localhost:8000

**Frontend Status:** 🟢 READY  
- ✅ React app configured
- ✅ Routing setup complete
- ✅ Authentication flow working
- ✅ All pages responsive
- ✅ Ready to run on http://localhost:3000

**Database Status:** 🟢 READY
- ✅ PostgreSQL connected
- ✅ Tables migrated successfully
- ✅ Sample data available
- ✅ Users created

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