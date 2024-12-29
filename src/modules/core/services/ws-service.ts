import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CONSTANTS } from 'src/common/constants';
import { Option } from '../../../db/entities/option.entity';
import { Pool } from '../../../db/entities/pool.entity';
import { PoolService } from './pool.service';

@WebSocketGateway({
  path: '/ws',
  cors: true,
  transports: ['websocket', 'polling'],
})
export class WsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private poolService: PoolService) {}

  private logger: Logger = new Logger(WsService.name);
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('WebSocket Service initialized');
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage(CONSTANTS.WS_EVENTS.CAST_VOTE)
  async handleCastVote(
    socket: Socket,
    payload: { poolId: Pool['id']; optionId: Option['id'] },
  ) {
    this.logger.log(
      `Received vote for pool ${payload.poolId} - option ${payload.optionId}`,
    );

    const pool = await this.poolService.castVote(
      socket.id,
      payload.poolId,
      payload.optionId,
    );

    this.server.emit(CONSTANTS.WS_EVENTS.POOL_UPDATED, {
      pool,
      notification: 'A new vote has been casted',
    });
  }
}
