# NEBULA FRONTEND APPLICATION

This repository contains a ReactJS frontend application that runs in a Docker container. The following guide will help you clone the project, set up the environment, build the Docker image, and run the container.

## Prerequisites

Before getting started, make sure you have the following installed:

1. **Git**: To clone the project.
2. **Docker**: To build and run the application inside a Docker container.
3. **Node.js**: (Optional) Required if you want to run the app locally before Dockerizing it.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

Replace `<repository-url>` with the actual URL of the Git repository, and `<repository-directory>` with the name of the directory created after cloning.

### 2. Install Dependencies (Optional for Local Development)

To run the application locally (outside of Docker), install the necessary dependencies:

```bash
npm install
```

To start the React application locally:

```bash
npm start
```

### 3. Set Up Environment Variables (Optional)

The application requires environment variables, create a `.env` file in the root directory of the project. For example:

```bash
# .env
NEBULA_BACKEND_APP_API_URL=https://api.example.com
```

Make sure these variables are referenced correctly in your React application (e.g., `process.env.REACT_APP_API_URL`).

### 4. Build Docker Image

Use the following command to build the Docker image for your ReactJS application.

```bash
docker build -t ernestoforit/nebula-frontend .
```

- `-t` option tags the image (you can change the name `react-app` to your preferred image name).
- The `.` at the end tells Docker to use the `Dockerfile` in the current directory.

### 5. Run Docker Container

Once the image is built, run the Docker container with the following command:

```bash
docker run -d -p 3000:5000 ernestoforit/nebula-frontend
```

- `-d` runs the container in detached mode.
- `-p 3000:5000` maps port 3000 on the host to port 3000 in the container (you can change the port if needed).
- `ernestoforit/nebula-frontend` is the name of the image created in step 4.

### 6. Access the Application

If the container is running successfully, you can access your React application by navigating to:

```
http://localhost:3000
```

Or replace `localhost` with the appropriate domain or IP if running in a different environment.
