import {
  IsString,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
  IsString as IsStringEach,
} from 'class-validator';

export class OptionUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsStringEach({ each: true })
  values?: string[];
}
