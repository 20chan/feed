FROM node as build-stage

WORKDIR /app

COPY ./app /app
RUN npm install
RUN npm run build

FROM nginx
EXPOSE 7062
COPY --from=build-stage /app/build /usr/share/nginx/html
