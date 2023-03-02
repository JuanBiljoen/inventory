FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV MONGO_PW=TempPWforHD94
ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]