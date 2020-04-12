FROM node:latest

WORKDIR /usr/src/app

# COPY package*.json ./
COPY package*.json /usr/usr/app

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY package.json /usr/src/app/package.json

RUN npm install

# COPY . .
COPY . /usr/src/app
# COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "start"]
