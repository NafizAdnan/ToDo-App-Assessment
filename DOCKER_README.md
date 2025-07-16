# Docker Setup for Todo Application

This document explains how to run the Todo application using Docker.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository and navigate to the project directory**

2. **Build and run the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - Admin interface: http://localhost:8000/admin

## Services

- **Frontend (React)**: Runs on port 80
- **Backend (Django)**: Runs on port 8000
- **Database (PostgreSQL)**: Runs on port 5432

## Environment Variables

You can customize the setup by creating a `.env` file in the root directory:

```env
POSTGRES_DB=todo_db
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80,http://frontend:80
```

## Useful Commands

- **Start services**: `docker-compose up`
- **Start in background**: `docker-compose up -d`
- **Stop services**: `docker-compose down`
- **View logs**: `docker-compose logs`
- **Rebuild**: `docker-compose up --build`
- **Remove volumes**: `docker-compose down -v`
- **View running containers**: `docker-compose ps`

## Development

For development, you can run services individually:

```bash
# Start only the database
docker-compose up db

# Run Django locally
cd todo_project
python manage.py runserver

# Run React locally
cd todo-frontend
npm start
```

## Database Management

- **Create superuser**: 
  ```bash
  docker-compose exec backend python manage.py createsuperuser
  ```

- **Run migrations**:
  ```bash
  docker-compose exec backend python manage.py migrate
  ```

- **Access database**:
  ```bash
  docker-compose exec db psql -U todo_user -d todo_db
  ```

## Troubleshooting

### Port Conflicts
If you get port conflicts, you can change the ports in `docker-compose.yml`:
```yaml
ports:
  - "8080:8000"  # Change 8000 to 8080
```

### Database Issues
If the database doesn't start properly:
```bash
docker-compose down -v  # Remove volumes
docker-compose up --build  # Rebuild and start
```

### Build Issues
If you encounter build issues:
```bash
docker-compose build --no-cache  # Rebuild without cache
```

## Production Deployment

For production deployment:

1. **Set environment variables**:
   ```env
   DEBUG=False
   SECRET_KEY=your-production-secret-key
   ALLOWED_HOSTS=your-domain.com
   ```

2. **Use a reverse proxy** (like Nginx) in front of the application

3. **Set up SSL certificates** for HTTPS

4. **Configure database backups**

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │  Database   │
│   (React)   │◄──►│   (Django)  │◄──►│ (PostgreSQL)│
│   Port 80   │    │  Port 8000  │    │  Port 5432  │
└─────────────┘    └─────────────┘    └─────────────┘
```

The frontend serves the React application and proxies API requests to the Django backend. The backend connects to the PostgreSQL database for data persistence. 