import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}