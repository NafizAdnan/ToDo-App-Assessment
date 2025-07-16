# 📝 To-Do Application

[![Django](https://img.shields.io/badge/Django-4.2+-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)

A full-stack To-Do application built with Django REST API (JWT authentication), React frontend (Tailwind CSS), SQLite/PostgreSQL database, and Dockerized deployment.

## 🎯 Assessment Deliverables

- ✅ **Source Code** - Complete backend (Django) + frontend (React)
- ✅ **API Documentation** - Postman collection + README documentation
- ✅ **Demo Screencast** - Application demonstration video
- ✅ **Deployment Steps** - Comprehensive setup instructions

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Docker (optional)

### Local Development

**1. Backend Setup:**
```bash
cd todo_project
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**2. Frontend Setup:**
```bash
cd todo-frontend
npm install
npm start
```

**3. Access the Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin Panel: http://localhost:8000/admin

### Docker Deployment

**Build and run all services:**
```bash
docker compose up --build
```

**Access:**
- Frontend: http://localhost (port 80)
- Backend API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin

For detailed Docker instructions, see [DOCKER_README.md](./DOCKER_README.md).

---

## 📚 API Documentation

### **Authentication Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login and get JWT tokens |
| POST | `/api/auth/token/refresh/` | Refresh access token |

### **Task Management (CRUD)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | List all tasks |
| POST | `/api/tasks/` | Create new task |
| GET | `/api/tasks/{id}/` | Get specific task |
| PUT | `/api/tasks/{id}/` | Update task |
| DELETE | `/api/tasks/{id}/` | Delete task |

### **Filtering Options**
- `?status=pending|completed` - Filter by status
- `?priority=high|medium|low` - Filter by priority
- `?upcoming=true` - Show upcoming tasks

### **Authentication**
All protected endpoints require the header:
```
Authorization: Bearer <access_token>
```

**📖 Full API Documentation:** Import [todo-api.postman_collection.json](./todo-api.postman_collection.json) into Postman for ready-to-use requests.

---

## 📽️ Demo Screencast

See [App Demo](./Demo_Video_2025-07-16_11-19-30.mkv) for application demonstration.

---

## 🏗️ Project Architecture

```
GigaTech/
├── todo_project/          # Django Backend
│   ├── todo_project/      # Django settings
│   ├── tasks/            # Tasks app
│   ├── requirements.txt  # Python dependencies
│   └── manage.py
├── todo-frontend/        # React Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── api.js       # API configuration
│   │   └── App.js       # Main app component
│   ├── package.json     # Node.js dependencies
│   └── Dockerfile       # Frontend container
├── docker-compose.yml   # Multi-container setup
├── todo-api.postman_collection.json  # API testing
└── README.md           # This file
```

---

## 🛠️ Technologies Used

### Backend
- **Django 4.2+** - Web framework
- **Django REST Framework** - API development
- **djangorestframework-simplejwt** - JWT authentication
- **django-cors-headers** - CORS handling
- **SQLite/PostgreSQL** - Database

### Frontend
- **React 18.2.0** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 🧪 Testing

### API Testing
1. Import [todo-api.postman_collection.json](./API Documentation/todo-api.postman_collection.json) into Postman
2. Set the `base_url` variable to your backend URL
3. Run the collection to test all endpoints

### Manual Testing
1. Register a new user
2. Login to get JWT tokens
3. Create, read, update, and delete tasks
4. Test filtering and search functionality

---

## 🚀 Deployment Options

### 1. **Vercel (Frontend) + Railway/Render (Backend)**
- Deploy React frontend to Vercel
- Deploy Django backend to Railway or Render
- Configure CORS and environment variables

### 2. **Docker (Full Stack)**
- Use the provided `docker-compose.yml`
- Deploy to any cloud provider supporting Docker

### 3. **Traditional Hosting**
- Deploy Django to traditional Python hosting
- Deploy React build to static hosting

---

## 📄 License

This project is created for assessment purposes.

---

## 📞 Support

For questions or issues:
- Check the [DOCKER_README.md](./DOCKER_README.md) for deployment help
- Review the API documentation
- Test with the provided Postman collection

---
