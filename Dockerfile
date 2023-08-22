FROM node:18.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . ./app

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
