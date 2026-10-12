# Etapa 1: compilar o frontend React
FROM node:24-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build


# Etapa 2: aplicação final
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY --chown=node:node config ./config
COPY --chown=node:node migrations ./migrations
COPY --chown=node:node seeders ./seeders
COPY --chown=node:node models ./models
COPY --chown=node:node src ./src

# Coloca o React compilado dentro da pasta pública do Express
COPY --from=frontend-build \
    --chown=node:node \
    /app/frontend/dist/ \
    ./src/public/

USER node

EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && npm run seed && npm start"]