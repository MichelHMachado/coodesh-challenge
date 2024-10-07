# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (if using yarn) or package-lock.json (if using npm)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile  # Or use npm install if you're using npm

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build  # This will run the build script from your package.json

EXPOSE 3000

# Command to run the application
CMD ["yarn", "preview"] 
