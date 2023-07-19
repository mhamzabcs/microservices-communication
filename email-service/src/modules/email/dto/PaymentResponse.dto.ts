import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PaymentResponseDTO {
  @IsString()
  paymentId: string;

  @IsString()
  status: string;
}
