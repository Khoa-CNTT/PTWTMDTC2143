import { OptionValueResponseDTO } from './option-value-response.dto';

export class OptionResponseDTO {
  id: string;
  name: string;
  values: OptionValueResponseDTO[];
}
