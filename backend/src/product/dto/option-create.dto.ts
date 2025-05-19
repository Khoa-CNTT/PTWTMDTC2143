import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class OptionCreateDTO {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  values: string[];
}
