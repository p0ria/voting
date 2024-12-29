import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Option } from '../../../db/entities/option.entity';
import { Pool } from '../../../db/entities/pool.entity';
import { Vote } from '../../../db/entities/vote.entity';
import { EntityManager } from 'typeorm';
import { CreatePoolRequest } from '../../pool/types/create-pool.request';

@Injectable()
export class PoolService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createPool(dto: CreatePoolRequest) {
    return this.entityManager.save(
      this.entityManager.create(Pool, {
        question: dto.question,
        options: dto.options.map((option) => ({
          name: option,
        })),
      }),
    );
  }

  async getPoolResults(id: Pool['id']) {
    return this.entityManager.findOne(Pool, {
      where: { id },
      relations: { options: true },
    });
  }

  async castVote(userId: string, poolId: Pool['id'], optionId: Option['id']) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const alreadyVoted = await transactionalEntityManager.findOne(Vote, {
          where: { userId, pool: { id: poolId } },
        });

        if (alreadyVoted) {
          throw new BadRequestException('User already voted');
        }

        const pool = await transactionalEntityManager.findOne(Pool, {
          where: { id: poolId },
        });

        if (!pool) {
          throw new NotFoundException('Pool not found');
        }

        await transactionalEntityManager.save(
          transactionalEntityManager.create(Vote, {
            userId,
            pool: { id: poolId },
            option: { id: optionId },
          }),
        );

        const option = await transactionalEntityManager.findOne(Option, {
          where: { id: optionId },
          lock: { mode: 'pessimistic_read' },
        });
        option.numberOfVotes++;

        await transactionalEntityManager.save(Option, option);

        return transactionalEntityManager.findOne(Pool, {
          where: { id: poolId },
          relations: { options: true },
        });
      },
    );
  }
}
