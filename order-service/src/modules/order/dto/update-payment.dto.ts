import { IsEnum, IsMongoId } from 'class-validator';
import { PaymentStatus } from 'src/core/enums/PaymentStatus.enum';

export class UpdatePaymentDTO {
  @IsMongoId()
  readonly paymentId: string;

  @IsEnum(PaymentStatus)
  readonly status: string;
}
