import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Payment } from './payment.schema';
import { OrderType } from '../enums/OrderType.enum';
import { OrderStatus } from '../enums/OrderStatus.enum';

export type OrderDocument = mongoose.HydratedDocument<Order>;

@Schema()
export class Order {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  payment: Payment;

  @Prop({
    type: String,
    default: OrderStatus.CREATED,
    enum: [...Object.values(OrderStatus)],
  })
  status: string;

  @Prop()
  orderEmailSent: boolean;

  @Prop()
  paymentEmailSent: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
