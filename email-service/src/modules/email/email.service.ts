import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/core/schemas/order.schema';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class EmailService {
  constructor() {}

  orderCreated() {
    return true;
  }

  paymentCreated() {
    return true;
  }
}
