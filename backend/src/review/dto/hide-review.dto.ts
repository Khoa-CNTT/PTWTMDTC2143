import { IsBoolean } from 'class-validator';

export class HideReviewDto {
  @IsBoolean()
  isHidden: boolean;
}
