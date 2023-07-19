import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @MessagePattern({ cmd: 'orderCreated' })
  orderCreated() {
    return this.emailService.orderCreated();
  }

  @MessagePattern({ cmd: 'paymentCreated' })
  paymentCreated() {
    return this.emailService.paymentCreated();
  }
}
