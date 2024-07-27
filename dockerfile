# Step 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Step 2: Create the production image
FROM node:16-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY package*.json ./
COPY --from=build /app/dist ./dist

# Copy .production.env file
COPY .production.env ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
