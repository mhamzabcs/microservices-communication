import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { Payment, PaymentDocument } from 'src/core/schemas/payment.schema';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentStatus } from 'src/core/enums/PaymentStatus.enum';
import { OrderStatus } from 'src/core/enums/OrderStatus.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @Inject('order-microservice')
    private readonly orderMicroservice: ClientProxy,
    @Inject('email-microservice')
    private readonly emailMicroservice: ClientProxy,
  ) {}

  async create(body: CreatePaymentDTO): Promise<PaymentResponseDTO> {
    const payment: PaymentDocument = await new this.paymentModel({
      ...body,
    }).save();
    this.emailMicroservice.emit({ cmd: 'paymentCreated' }, { id: payment.id });
    return { paymentId: payment.id, status: payment.status };
  }

  async getPayment(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async updatePaymentStatus(id: string) {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');
    payment.status = PaymentStatus.COMPLETED;
    await payment.save();
    this.orderMicroservice.emit(
      { cmd: 'updateOrderPayment' },
      { paymentId: id, status: OrderStatus.PAYMENTINITIATED },
    );
  }
}
