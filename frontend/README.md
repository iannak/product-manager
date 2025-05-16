# Product Manager

Uma aplicação web moderna para gerenciamento de produtos, construída com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

- ✨ Interface moderna e responsiva
- 📝 CRUD completo de produtos
- 🔍 Busca e filtros avançados
- 💰 Suporte a preços em Real (R$)
- 📱 Layout adaptável para todos dispositivos
- 🎯 Paginação intuitiva
- 🎨 Design moderno com Tailwind CSS

## Tecnologias

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Redux](https://redux.js.org/) - Gerenciamento de estado
- [MSW](https://mswjs.io/) - Mock de API

## Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd product-manager

# Instale as dependências
npm install
# ou
yarn install
```

## Executando o Projeto

```bash
# Modo desenvolvimento
npm run dev
# ou
yarn dev

# Modo produção
npm run build
npm start
# ou
yarn build
yarn start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
product-manager/
├── src/
│   ├── components/     # Componentes React
│   ├── store/         # Configuração e slices do Redux
│   ├── types/         # Tipos TypeScript
│   └── mocks/         # Mocks MSW
├── public/            # Arquivos estáticos
└── ...
```

## Principais Funcionalidades

### Gerenciamento de Produtos
- Listagem com paginação (3 itens por página)
- Criação de novos produtos
- Edição de produtos existentes
- Remoção de produtos

### Filtros e Ordenação
- Busca por nome
- Filtro por faixa de preço
- Ordenação por nome ou preço

### Interface Responsiva
- Design adaptável para desktop e mobile
- Componentes otimizados para diferentes telas
- Navegação intuitiva

## Desenvolvimento

O projeto utiliza:

- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimização automática de fontes
- MSW para mock de API durante desenvolvimento
- Redux para gerenciamento de estado global
- TypeScript para maior segurança e produtividade

## Saiba Mais

Para aprender mais sobre as tecnologias utilizadas:

- [Documentação Next.js](https://nextjs.org/docs)
- [Aprenda Next.js](https://nextjs.org/learn)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação Redux](https://redux.js.org/introduction/getting-started)

## Deploy

A maneira mais fácil de fazer deploy da aplicação é usando a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
