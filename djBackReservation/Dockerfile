FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install \
npm install express \
npm install nodemon

EXPOSE 3002

CMD ["nodemon","index.js"]