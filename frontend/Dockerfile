# Etapa de build com Node.js
FROM node:18 AS build

WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copiar o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Etapa de deploy com Nginx (para servir a aplicação estática)
FROM nginx:alpine

# Copiar os arquivos de build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
