import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/db/entities/option.entity';
import { Pool } from 'src/db/entities/pool.entity';
import { Vote } from 'src/db/entities/vote.entity';
import { PoolController } from './pool.controller';

@Module({
  controllers: [PoolController],
  imports: [TypeOrmModule.forFeature([Pool, Option, Vote])],
})
export class PoolModule {}
