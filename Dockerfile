# Etapa 1: Build de Angular
FROM node:18 AS build-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: NGINX para servir el frontend
FROM nginx:stable-alpine

COPY --from=build-stage /app/dist/front-golden-eggs/browser /usr/share/nginx/html

# Config personalizada de NGINX
COPY ../nginx/default.conf /etc/nginx/nginx.conf
