import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { InitialDataSeeder } from './seeds/initial-data.seed';
import { runSeeders } from 'typeorm-extension';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: [Product, Order],
  synchronize: true,
  logging: true, // Mantenha logging ativado para depuração
};

const dataSource = new DataSource(options);

console.log(
  'Entities:',
  dataSource.entityMetadatas.map((e) => e.name),
);

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    await runSeeders(dataSource, {
      seeds: [InitialDataSeeder],
    });

    console.log('Database has been seeded!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
