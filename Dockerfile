# Use the official Node.js 16 image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (this installs both production and development dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app listens on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]