import { PartialType } from '@nestjs/mapped-types';
import { VoucherCreateDTO } from './voucher-create.dto';

export class VoucherUpdateDTO extends PartialType(VoucherCreateDTO) {}
