import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Items } from '../../items/entities/items.entity';
import { Orders } from './orders.entity';

@Entity()
export class Orders_description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.items)
  order: Orders;

  @ManyToOne(() => Items)
  product: Items;
}
