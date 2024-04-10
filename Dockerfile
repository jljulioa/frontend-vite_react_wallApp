FROM node:alpine 

RUN apk tzdata update && apk add --no-cache tzdata

ENV TZ=America/Bogota

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]