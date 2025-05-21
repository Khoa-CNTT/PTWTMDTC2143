import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class OptionCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  values: string[];
}

export class OptionsCreateDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionCreateDTO)
  options: OptionCreateDTO[];
}
