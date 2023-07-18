import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/core/schemas/order.schema';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('order-microservice') private readonly client: ClientProxy,
  ) {}

  async create(body: CreateOrderDTO): Promise<Order> {
    this.client.send({ cmd: 'orderCreated' }, { email: body.email });

    const response: PaymentResponseDTO = await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/payment`,
    );

    const order: Order = await new this.orderModel({
      ...body,
      payment: response.paymentId,
    }).save();

    return order;
  }

  getOrder(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async updatePayment(data: UpdatePaymentDTO): Promise<boolean> {
    const result = await this.orderModel
      .updateOne({ id: data.id }, { status: data.status })
      .exec();
    return result.modifiedCount > 0;
  }
}
