import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/core/schemas/order.schema';
import { Payment } from 'src/core/schemas/payment.schema';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async orderCreated(data: { id: string }) {
    await this.orderModel.updateOne({ _id: data.id }, { orderEmailSent: true });
    return true;
  }

  async paymentCreated(data: { id: string }) {
    await Promise.resolve([
      await this.orderModel.updateOne(
        { payment: data.id },
        { paymentEmailSent: true },
      ),
      await this.paymentModel.updateOne(
        { _id: data.id },
        { paymentEmailSent: true },
      ),
    ]);
    return true;
  }
}
