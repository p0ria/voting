import { Column, Entity, OneToMany } from 'typeorm';
import { Option } from './option.entity';
import { EntityBase } from '../../types';
import { Vote } from './vote.entity';

@Entity()
export class Pool extends EntityBase {
  @Column({ unique: true })
  question: string;

  @OneToMany(() => Option, (option) => option.pool, { cascade: true })
  options: Option[];

  @OneToMany(() => Vote, (vote) => vote.pool)
  votes: Vote[];
}
