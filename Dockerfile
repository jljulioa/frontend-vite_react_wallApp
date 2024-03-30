FROM node:21.7.1-alpine as build

RUN apk tzdata update && apk add --no-cache tzdata

ENV TZ=America/Bogota

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]