# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the specific application (statistics-service)
RUN npm run build statistics-service

# Stage 2: Create the final lightweight image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/statistics-service ./dist/apps/statistics-service
COPY package.json .

# No EXPOSE needed as it primarily uses RabbitMQ, but CMD is essential

# Command to run the application
CMD ["node", "dist/apps/statistics-service/main"] 