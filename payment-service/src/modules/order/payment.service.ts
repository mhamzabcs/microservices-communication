import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { Payment } from 'src/core/schemas/payment.schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @Inject('email-microservice') private readonly client: ClientProxy,
  ) {}

  async create(body: CreatePaymentDTO): Promise<PaymentResponseDTO> {
    const payment = await new this.paymentModel({
      ...body,
    }).save();
    this.client.send({ cmd: 'paymentCreated' }, { email: body.email });
    return { paymentId: payment.id, status: payment.status };
  }

  getPayment(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).exec();
  }
}
