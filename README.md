# Ensolvers challenge

### Default login
- username: `jhonuser`
- password: `doe`

## Prerequisites

Ensure the following tools and runtimes are installed on your machine:

- **Docker**: 27.4.0
- **Docker Compose**: v2.30.3-desktop.1
- **Docker Desktop**: The desktop application for managing Docker containers.

Additionally, these technologies and libraries are used in the project:
### Backend (NestJS)
### Frontend (React + Vite)

Follow these steps to set up and run the application:

1. Clone the repository:
   ```bash
   git clone https://github.com/DFtorres1/Ensolvers-project.git
   cd Ensolvers-project
   ```

2. Ensure Docker Desktop is running on your machine.

3. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Once the build completes, the backend and frontend will be running in their respective containers.

5. Enter to `localhost:4173`

## Notes

- Ensure no other applications are using the ports required by the application.
- Ensure the backend is running and the migrations ran successfully
- To stop the containers, use:
  ```bash
  docker-compose down
  ```

### Respositories
- [Backend](https://github.com/DFtorres1/ensolvers-notes-back)
- [Frontend](https://github.com/DFtorres1/ensolvers-notes-front)
