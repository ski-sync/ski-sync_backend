# Ski-Sync Backend

Backend microservices-based API for the Ski-Sync application, built with NestJS.

## 🏗 Architecture

The application is built using a microservices architecture with the following components:

- **API Gateway** (Port 3000): Main entry point for all client requests
- **User Service** (Port 3001): Handles user management and authentication
- **Statistics Service**: Processes and stores activity statistics
- **Infrastructure Services**:
  - PostgreSQL: Main database
  - RabbitMQ: Message broker for inter-service communication
  - InfluxDB: Time-series database for statistics

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ski_sync?schema=public

# JWT
JWT_SECRET=your_jwt_secret

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_USER_QUEUE=user_queue
RABBITMQ_STATISTICS_QUEUE=statistics_queue

# InfluxDB
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=my-super-secret-auth-token
INFLUXDB_ORG=ski-sync-org
INFLUXDB_BUCKET=ski-sync-bucket

# Service Ports
API_GATEWAY_PORT=3000
USER_SERVICE_PORT=3001
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npm run prisma:generate
```

3. Run database migrations:
```bash
npm run prisma:migrate:dev
```

### Running the Application

#### Development Mode

Start all services locally:
```bash
# Start infrastructure services (PostgreSQL, RabbitMQ, InfluxDB)
docker-compose up -d postgres rabbitmq influxdb

# Start API Gateway
npm run start:api

# Start User Service
npm run start:user

# Start Statistics Service
npm run start:statistics
```

#### Docker Mode

Run the entire application stack using Docker Compose:
```bash
docker-compose up -d
```

## 📚 API Documentation

Once the API Gateway is running, you can access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🛠 Available Scripts

- `npm run build`: Build all applications
- `npm run start:api`: Start API Gateway in watch mode
- `npm run start:user`: Start User Service in watch mode
- `npm run start:statistics`: Start Statistics Service in watch mode
- `npm run docker:up`: Start all services using Docker Compose
- `npm run docker:down`: Stop all Docker services
- `npm run prisma:generate`: Generate Prisma Client
- `npm run prisma:migrate:dev`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio

## 🔧 Database Management

### Prisma Studio

To view and manage your database through a GUI:

```bash
npm run prisma:studio
```

### Migrations

Create a new migration:

```bash
npm run prisma:migrate:dev
```

Apply migrations in production:

```bash
npm run prisma:migrate:deploy
```

## 📦 Project Structure

```
ski-sync_backend/
├── apps/
│   ├── api-gateway/        # API Gateway service
│   ├── user-service/       # User management service
│   └── statistics-service/ # Statistics processing service
├── prisma/                 # Database schema and migrations
├── shared/                 # Shared code between services
└── docker-compose.yml      # Docker services configuration
```

## 🔐 Security

- JWT-based authentication
- Environment variables for sensitive data
- CORS enabled
- Input validation using class-validator

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.