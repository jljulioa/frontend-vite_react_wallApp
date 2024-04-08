FROM node:21.7.1-alpine as build

RUN apk tzdata update && apk add --no-cache tzdata

ENV TZ=America/Bogota

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM ubuntu

RUN apt-get update

RUN apt-get install nginx -y

COPY --from=build /app/dist /var/www/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]