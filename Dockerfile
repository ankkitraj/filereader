# Stage 1: Build the application
FROM node:16 as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Create the production image
FROM node:16-alpine as production

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/index.js"]