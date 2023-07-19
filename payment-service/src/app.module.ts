import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/order/payment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
