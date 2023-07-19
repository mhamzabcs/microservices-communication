import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/core/schemas/order.schema';
import { ClientProxy } from '@nestjs/microservices';
import axios, { AxiosResponse } from 'axios';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('email-microservice') private readonly client: ClientProxy,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async create(body: CreateOrderDTO): Promise<OrderDocument> {
    const response: AxiosResponse<PaymentResponseDTO> = await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/payment`,
      body,
    );

    const order: OrderDocument = await new this.orderModel({
      ...body,
      payment: response.data.paymentId,
    }).save();
    this.client.emit({ cmd: 'orderCreated' }, { id: order.id });

    return order;
  }

  async getOrder(id: string): Promise<OrderDocument> {
    const order: OrderDocument = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updatePayment(data: UpdatePaymentDTO): Promise<boolean> {
    const result = await this.orderModel
      .updateOne({ payment: data.paymentId }, { status: data.status })
      .exec();
    return result.modifiedCount > 0;
  }
}
