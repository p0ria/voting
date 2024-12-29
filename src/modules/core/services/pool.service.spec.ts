import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';
import { PoolService } from './pool.service';
import { CreatePoolRequest } from 'src/modules/pool/types/create-pool.request';
import { Pool } from 'src/db/entities/pool.entity';

jest.mock('typeorm/entity-manager/EntityManager', () => {
  return {
    EntityManager: jest.fn().mockImplementation(() => ({
      create: jest
        .fn()
        .mockImplementation((entity, data: CreatePoolRequest) => {
          return data;
        }),
      save: jest.fn().mockImplementation((data: Pool) => {
        return {
          id: 1,
          question: data.question,
          options: data.options.map((option, idx) => ({
            id: idx + 1,
            name: option.name,
            numberOfVotes: 0,
            votes: [],
          })),
        };
      }),
    })),
    transaction: jest.fn().mockImplementation((fn) => fn()),
  };
});

describe('PoolService', () => {
  let poolService: PoolService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolService, EntityManager],
    }).compile();

    poolService = module.get<PoolService>(PoolService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(poolService).toBeDefined();
  });

  it('should create pool', async () => {
    const pool = await poolService.createPool({
      question: 'Test Pool',
      options: ['Option 1', 'Option 2'],
    });

    expect(pool).toBeDefined();
  });

  it('should cast vote', async () => {
    const pool = await poolService.castVote('1', 1, 1);

    expect(pool).toBeDefined();
  });
});
