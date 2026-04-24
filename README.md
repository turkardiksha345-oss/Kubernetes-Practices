# Task Manager App

A modern, attractive task management application with React frontend, Node.js Express backend, and MongoDB database.

## Architecture

- **Frontend**: React application served via Nginx with modern UI/UX
- **Backend**: Node.js Express API with RESTful endpoints
- **Database**: MongoDB for data persistence

## Features

- ✨ Add new tasks with titles and descriptions
- 📊 View task statistics (pending/completed counts)
- 🔍 Filter tasks by status (All, Pending, Completed)
- ✅ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📱 Responsive design for mobile and desktop
- 🎨 Modern, animated UI with smooth transitions

## Prerequisites

- Docker and Docker Compose (for containerized deployment)
- kubectl and a Kubernetes cluster (for Kubernetes deployment)
- Node.js and npm (for local development without Docker)

## Quick Start with Docker Compose

### 1. Clone or navigate to the project directory
```bash
cd task-manager-app
```

### 2. Build and run all services
```bash
docker-compose up --build
```

### 3. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 4. Stop the application
```bash
docker-compose down
```

### Additional Docker Compose commands
```bash
# Run in background (detached mode)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongo

# Rebuild and restart specific service
docker-compose up --build backend

# Remove containers and volumes
docker-compose down -v
```

## Local Development (without Docker)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally or connection string

### 1. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:5.0

# Or install MongoDB locally and start it
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run on http://localhost:5000

### 3. Setup Frontend (in another terminal)
```bash
cd frontend
npm install
npm start
```
Frontend will run on http://localhost:3000

### 4. Environment Variables
Create `.env` files as needed:

**Backend (.env)**:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:5000
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (Minikube, EKS, GKE, etc.)
- kubectl configured
- Docker registry access

### 1. Build and push Docker images
```bash
# Build images
docker build -t your-registry/task-manager-frontend ./frontend
docker build -t your-registry/task-manager-backend ./backend

# Push to registry (replace with your registry)
docker push your-registry/task-manager-frontend
docker push your-registry/task-manager-backend
```

### 2. Update image names in Kubernetes manifests
```bash
# Edit the image names in k8s/backend.yaml and k8s/frontend.yaml
# Change from:
# image: task-manager-backend:latest
# To:
# image: your-registry/task-manager-backend:latest
```

### 3. Apply Kubernetes manifests
```bash
# Apply all manifests
kubectl apply -f k8s/

# Or apply individually
kubectl apply -f k8s/rbac.yaml
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

### 4. Check deployment status
```bash
# Check pods
kubectl get pods

# Check services
kubectl get services

# Check deployments
kubectl get deployments

# View detailed pod information
kubectl describe pod <pod-name>
```

### 5. Access the application
```bash
# Get the frontend service external IP
kubectl get services frontend

# Port forward for local access (if using LoadBalancer doesn't work)
kubectl port-forward service/frontend 8080:80

# Then access at http://localhost:8080
```

### 6. View logs and troubleshoot
```bash
# View logs for all pods
kubectl logs -f deployment/backend
kubectl logs -f deployment/frontend
kubectl logs -f deployment/mongo

# Check pod status
kubectl get pods -o wide

# Debug pod issues
kubectl describe pod <pod-name>
kubectl exec -it <pod-name> -- /bin/sh
```

### 7. Clean up Kubernetes deployment
```bash
# Remove all resources
kubectl delete -f k8s/

# Or remove specific resources
kubectl delete deployment backend frontend mongo
kubectl delete service backend frontend mongo
kubectl delete pvc mongo-pvc
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Task Schema
```json
{
  "title": "Task title",
  "description": "Task description (optional)",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Development Commands

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from Create React App
```

### Backend
```bash
cd backend
npm install         # Install dependencies
npm run dev         # Start development server with nodemon
npm start           # Start production server
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port
   netstat -ano | findstr :3000
   # Kill process
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB is running
   - Check MONGO_URI environment variable
   - Verify network connectivity in Docker/K8s

3. **Kubernetes pod crashes**
   ```bash
   kubectl logs <pod-name>
   kubectl describe pod <pod-name>
   ```

4. **Frontend can't connect to backend**
   - Check REACT_APP_API_URL environment variable
   - Verify backend service is running
   - Check network policies in Kubernetes

### Docker Issues
```bash
# Clean up Docker
docker system prune -a
docker volume prune

# Rebuild without cache
docker-compose build --no-cache
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task