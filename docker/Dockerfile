# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY ../ .

# Expose the port the app runs on
EXPOSE 3211

# Start the application
CMD ["npm", "run", "dev"]