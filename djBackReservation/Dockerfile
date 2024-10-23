FROM nodejs:14-alpine

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["nodemon","index.js"]