FROM node:latest

WORKDIR /usr/src/app

# COPY package*.json ./
COPY package*.json ./

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY package.json /usr/src/app/package.json

RUN npm install

# COPY . .
COPY . ./
# COPY . /usr/src/app

EXPOSE ${PORT}

CMD ["npm", "start"]
