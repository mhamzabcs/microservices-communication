import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Order, OrderDocument } from 'src/core/schemas/order.schema';
import { MessagePattern } from '@nestjs/microservices';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  create(@Body() body: CreateOrderDTO): Promise<OrderDocument> {
    return this.orderService.create(body);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string): Promise<OrderDocument> {
    return await this.orderService.getOrder(id);
  }

  @MessagePattern({ cmd: 'updateOrderPayment' })
  async updateOrderPayment(data: UpdatePaymentDTO): Promise<boolean> {
    return await this.orderService.updatePayment(data);
  }
}
