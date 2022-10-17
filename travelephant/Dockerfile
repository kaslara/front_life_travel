FROM node:12 as build-stage
WORKDIR /app
EXPOSE 80

COPY . /app/

WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]