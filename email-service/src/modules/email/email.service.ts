import { Injectable } from '@nestjs/common';

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
