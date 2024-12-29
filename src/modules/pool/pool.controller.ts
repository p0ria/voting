import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { PoolService } from '../core/services/pool.service';
import { CreatePoolRequest } from './types/create-pool.request';

@Controller('pools')
export class PoolController {
  constructor(
    @Inject(forwardRef(() => PoolService))
    private readonly poolService: PoolService,
  ) {}

  @Post()
  async createPool(@Body() dto: CreatePoolRequest) {
    return this.poolService.createPool(dto);
  }

  @Get(':id/results')
  async getPoolResults(@Param('id') id: number) {
    return this.poolService.getPoolResults(id);
  }
}
