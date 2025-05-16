Projeto de Gerenciamento de Pedidos
Este projeto é uma API construída com NestJS para gerenciamento de produtos e pedidos, utilizando banco de dados PostgreSQL e containerizada com Docker Compose.

🐳 Rodando com Docker Compose
Pré-requisitos
Docker

Docker Compose

🚀 Instruções
Clone o repositório


git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
Crie o arquivo .env

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env

POSTGRES_DB=orders_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_HOSt=postgres
DB_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
APP_PORT=3001
Suba os containers


docker-compose up --build
Isso iniciará:

O backend NestJS na porta 3001

O PostgreSQL na porta 5432

📂 Estrutura do Projeto
css

.
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── orders/
│   ├── products/
│   └── main.ts
├── .env
├── README.md
└── ...
🔍 Endpoints
Após subir o projeto, você pode acessar a documentação Swagger:


http://localhost:3001/api
🛑 Parar os containers

docker-compose down
Para remover volumes:


docker-compose down -v
🧪 Testes
Caso existam testes configurados, você pode rodá-los com:


docker-compose exec backend npm run test
