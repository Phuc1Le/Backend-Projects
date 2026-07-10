# Use the official Node.js image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Tell Docker this app listens on port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]