FROM nginx:latest AS base
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
FROM base AS final
RUN mkdir -p /var/www/html
RUN chmod 755 -R /var/www/html
RUN chown www-data:www-data -R /var/www/html
WORKDIR /var/www/html
COPY --from=build /app/build/ .
RUN echo 'server {' > /etc/nginx/conf.d/default.conf
RUN echo '      listen 80 default_server;' >> /etc/nginx/conf.d/default.conf
RUN echo '      listen [::]:80 default_server;' >> /etc/nginx/conf.d/default.conf
RUN echo '      server_name _;' >> /etc/nginx/conf.d/default.conf
RUN echo '      root /var/www/html;' >> /etc/nginx/conf.d/default.conf
RUN echo '      access_log  off;' >> /etc/nginx/conf.d/default.conf
RUN echo '      location / {' >> /etc/nginx/conf.d/default.conf
RUN echo '              try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf
RUN echo '      }' >> /etc/nginx/conf.d/default.conf
RUN echo '}' >> /etc/nginx/conf.d/default.conf
EXPOSE 80
