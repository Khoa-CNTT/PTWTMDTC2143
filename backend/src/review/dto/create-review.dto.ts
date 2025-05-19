import { IsString, IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
