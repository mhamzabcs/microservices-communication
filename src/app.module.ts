import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
