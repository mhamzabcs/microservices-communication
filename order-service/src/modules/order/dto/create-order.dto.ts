import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { OrderType } from 'src/core/enums/OrderType.enum';

export class CreateOrderDTO {
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly amount: number;

  @IsEnum(OrderType)
  readonly type: string;
}
