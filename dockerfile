# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Install Python 2.7
RUN apt-get update && \
    apt-get install -y --no-install-recommends python2.7 && \
    ln -sf /usr/bin/python2.7 /usr/bin/python && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local React code to the container at /app
COPY . /app

# Expose port 3000 for the React app
EXPOSE 3000

# Define the command to run your React app
CMD ["npm", "start"]
