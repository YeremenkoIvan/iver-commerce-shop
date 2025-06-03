// dto/order.dto.ts
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  id: number;
  amount: number;

  user: {
    id: number;
    firstName: string;
    lastName: string;
    // добавь другие поля пользователя, если нужно
  };

  items: OrderItemDto[];
}
