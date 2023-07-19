import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderType } from '../enums/OrderType.enum';
import { PaymentStatus } from '../enums/PaymentStatus.enum';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  email: string;

  @Prop()
  amount: number;

  @Prop({
    type: String,
    required: true,
    enum: [...Object.values(OrderType)],
  })
  type: string;

  @Prop({
    type: String,
    default: PaymentStatus.CREATED,
    enum: [...Object.values(PaymentStatus)],
  })
  status: string;

  @Prop()
  paymentEmailSent: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
