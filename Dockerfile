FROM node:18.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
