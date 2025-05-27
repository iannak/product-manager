# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa final (SSR)
FROM node:18

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]

