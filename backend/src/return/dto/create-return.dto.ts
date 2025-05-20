import { ReturnItemDTO } from './return-item.dto';

export class CreateReturnDTO {
  reason?: string;
  items: ReturnItemDTO[];
}
