FROM node:20.14.0

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm i

CMD ["npm", "start"]

EXPOSE 3000