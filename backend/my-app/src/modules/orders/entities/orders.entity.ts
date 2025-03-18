import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Orders_description } from './orders_description.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Orders_description, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: Orders_description[];
}
