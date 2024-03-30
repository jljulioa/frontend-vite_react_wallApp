FROM node:21.7.1-alpine

RUN apk tzdata update && apk add --no-cache tzdata

ENV TZ=America/Bogota

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]