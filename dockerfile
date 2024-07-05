FROM node:20

WORKDIR /kanastra-hiring-challenge

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
