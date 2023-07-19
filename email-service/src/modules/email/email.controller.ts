import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @MessagePattern({ cmd: 'orderCreated' })
  orderCreated(data: { id: string }) {
    return this.emailService.orderCreated(data);
  }

  @MessagePattern({ cmd: 'paymentCreated' })
  paymentCreated(data: { id: string }) {
    return this.emailService.paymentCreated(data);
  }
}
