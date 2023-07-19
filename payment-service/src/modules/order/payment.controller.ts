import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentResponseDTO } from './dto/PaymentResponse.dto';
import { Payment } from 'src/core/schemas/payment.schema';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/')
  async create(@Body() body: CreatePaymentDTO): Promise<PaymentResponseDTO> {
    return await this.paymentService.create(body);
  }

  @Patch('/:id')
  async updatePaymentStatus(@Param('id') id: string) {
    return await this.paymentService.updatePaymentStatus(id);
  }

  @Get('/:id')
  async getPayment(@Param('id') id: string): Promise<Payment> {
    return await this.paymentService.getPayment(id);
  }
}
