# Build stage
FROM node:22-alpine AS build

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

# Runtime stage
FROM nginxinc/nginx-unprivileged:alpine AS runtime

LABEL org.opencontainers.image.source=https://github.com/nicololuescher/nicolo.info

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
