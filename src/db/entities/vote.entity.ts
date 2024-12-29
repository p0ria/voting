import { EntityBase } from '../../types';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Option } from './option.entity';
import { Pool } from './pool.entity';

@Entity()
@Unique(['pool', 'userId'])
export class Vote extends EntityBase {
  @ManyToOne(() => Option, (option) => option.votes)
  option: Option;

  @ManyToOne(() => Pool, (pool) => pool.votes)
  pool: Pool;

  @Column()
  userId: string;
}
