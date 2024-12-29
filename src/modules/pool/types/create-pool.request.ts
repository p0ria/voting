import { ArrayMaxSize, IsArray, IsString, MaxLength } from 'class-validator';

export class CreatePoolRequest {
  @IsString()
  question: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(4)
  options: string[];
}
