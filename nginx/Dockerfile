FROM nginx:latest

RUN apt update && apt install -y apache2-utils
RUN rm -f /etc/nginx/conf.d/*

# Add user w/encrypted password
RUN echo -n 'youbuntu:' >> /etc/nginx/.htpasswd
RUN openssl passwd Dr!ss0un0urs >> /etc/nginx/.htpasswd
