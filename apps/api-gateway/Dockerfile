# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the specific application (api-gateway)
RUN npm run build api-gateway

# Stage 2: Create the final lightweight image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api-gateway ./dist/apps/api-gateway
COPY package.json .

# Expose the port the app runs on (Adjust if necessary)
EXPOSE 3000 

# Command to run the application
CMD ["node", "dist/apps/api-gateway/main"] 