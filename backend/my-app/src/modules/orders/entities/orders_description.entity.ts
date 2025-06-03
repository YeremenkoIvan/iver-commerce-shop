import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Items } from '../../items/entities/items.entity';
import { Orders } from './orders.entity';

@Entity()
export class Orders_description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToOne(() => Items, (item) => item.ordersDescriptions)
  @JoinColumn({ name: 'item_id' })
  product: Items;
}
