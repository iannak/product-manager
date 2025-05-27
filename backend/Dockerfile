FROM node:18 AS build

WORKDIR /app

# Copiar as dependências do backend
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copiar o restante do código do backend
COPY . .

# Rodar o build da aplicação (NestJS, React, etc.)
RUN npm run build

FROM node:18

WORKDIR /app

# Copiar os arquivos gerados na etapa de build
COPY --from=build /app ./

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

