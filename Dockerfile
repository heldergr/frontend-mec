FROM nginx:alpine
COPY dist/frontend-mec /usr/share/nginx/html
