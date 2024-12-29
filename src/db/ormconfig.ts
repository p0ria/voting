import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_URL,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: ['src/db/entities/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});
