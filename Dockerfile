# build stage
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:alpine
COPY --from=build /app/dist/front-golden-eggs /usr/share/nginx/html
