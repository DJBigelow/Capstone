FROM node:15-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 

ENV REACT_APP_SSO_URL=https://sso.snow.edu
ENV REACT_APP_BASE_URL=https://portal.snow.edu/

COPY . .
RUN npm run build

FROM nginx
RUN apt update && apt install -y curl
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
CMD ["nginx", "-g", "daemon off;"]