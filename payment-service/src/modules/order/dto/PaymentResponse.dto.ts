import { IsString } from 'class-validator';

export class PaymentResponseDTO {
  @IsString()
  paymentId: string;

  @IsString()
  status: string;
}