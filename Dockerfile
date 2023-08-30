
# Use a Node.js Alpine base image
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies for both development and production
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Install only production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your application
CMD ["npm", "start"]

