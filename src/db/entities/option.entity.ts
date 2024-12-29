import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Pool } from './pool.entity';
import { EntityBase } from '../../types';
import { Vote } from './vote.entity';

@Entity()
export class Option extends EntityBase {
  @Column()
  name: string;

  @Column({ default: 0 })
  numberOfVotes: number;

  @ManyToOne(() => Pool, (pool) => pool.options)
  @JoinColumn()
  pool: Pool;

  @OneToMany(() => Vote, (vote) => vote.option)
  votes: Vote[];
}
