# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the specific application (user-service)
RUN npm run build user-service

# Stage 2: Create the final lightweight image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/user-service ./dist/apps/user-service
COPY package.json .

# Expose the port the app runs on (If it listens on HTTP, otherwise optional)
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/apps/user-service/main"] 