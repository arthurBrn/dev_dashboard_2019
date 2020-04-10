# Node image
FROM node:12.2.0

# Define working directory
WORKDIR /app

# 
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# Add app
COPY . /app

# Start the application
CMD ng serve --host 0.0.0.0