import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { Payment } from 'src/core/schemas/payment.schema';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/')
  create(@Body() body: CreatePaymentDTO): Promise<PaymentResponseDTO> {
    return this.paymentService.create(body);
  }

  @Get('/:id')
  getPayment(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPayment(id);
  }
}
