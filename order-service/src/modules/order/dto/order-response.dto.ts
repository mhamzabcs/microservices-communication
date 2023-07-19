import { Expose } from 'class-transformer';

export class OrderResponseDTO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  status: string;

  @Expose()
  type: string;

  @Expose()
  amount: number;

  @Expose()
  payment: string;
}
