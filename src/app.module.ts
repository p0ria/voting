import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolModule } from './modules/pool/pool.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_URL,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      entities: ['./db/entities/*.entity.ts'],
      migrations: ['./db/migrations/*.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CoreModule,
    PoolModule,
  ],
})
export class AppModule {}
