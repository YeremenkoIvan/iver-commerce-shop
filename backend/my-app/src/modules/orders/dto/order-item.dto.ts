export class OrderItemDto {
  id: number;
  quantity: number;

  product: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
}
