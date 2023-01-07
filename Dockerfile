FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8808

CMD ["yarn", "start"]