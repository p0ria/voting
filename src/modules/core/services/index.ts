import { PoolService } from './pool.service';
import { WsService } from './ws-service';

export * from './pool.service';
export * from './ws-service';

export const SERVICES = [PoolService, WsService];
