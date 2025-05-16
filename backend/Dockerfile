# Usando a imagem oficial do Node.js
FROM node:18

WORKDIR /app

# Copiar os arquivos de configuração e dependências
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install --legacy-peer-deps

# Copiar o restante do código para dentro do container (incluindo a pasta src)
COPY . /app

EXPOSE 3001

# Rodar o build
RUN npm run build

# Iniciar o servidor
CMD ["npm", "start"]
