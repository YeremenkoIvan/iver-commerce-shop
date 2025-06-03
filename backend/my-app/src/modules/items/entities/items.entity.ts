import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orders_description } from '../../orders/entities/orders_description.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Orders_description, (desc) => desc.product)
  ordersDescriptions: Orders_description[];
}
