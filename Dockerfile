FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npx quasar prepare && npx quasar build

FROM httpd:2.4-alpine

COPY --from=build /app/dist/spa/ /usr/local/apache2/htdocs/

EXPOSE 80
