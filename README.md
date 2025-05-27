# Product Manager

A full-stack application for managing products and orders, built with NestJS and Next.js.

## Features

- Product management (CRUD operations)
- Order management
- Real-time status updates
- Responsive design
- Filtering and sorting capabilities
- Pagination

## Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Fly.io (Deployment)

### Frontend
- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Fly.io (Deployment)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- Fly.io CLI
- PostgreSQL

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-manager.git
cd product-manager
```

2. Backend Setup:
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run start:dev
```

3. Frontend Setup:
```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

4. Database Setup:
```bash
docker-compose up -d
```

### Environment Variables

#### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/product_manager
PORT=3001
```

#### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Deployment

### Backend Deployment
1. Install Fly.io CLI
2. Login to Fly.io:
```bash
fly auth login
```
3. Deploy:
```bash
cd backend
fly deploy
```

### Frontend Deployment
1. Deploy:
```bash
cd frontend
fly deploy
```

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- Automatic deployment to Fly.io on push to main branch
- Separate workflows for frontend and backend
- Environment variables managed through GitHub Secrets

## API Documentation

The API documentation is available at `/api` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
