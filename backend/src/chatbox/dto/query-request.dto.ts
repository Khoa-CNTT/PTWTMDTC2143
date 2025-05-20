import { IsString } from 'class-validator';

export class QueryRequestDto {
  @IsString()
  question: string;
}
