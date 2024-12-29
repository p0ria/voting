import { IsNumber, IsString } from 'class-validator';

export class CreateVoteRequest {
  @IsString()
  userId: string;

  @IsNumber()
  optionId: number;
}
