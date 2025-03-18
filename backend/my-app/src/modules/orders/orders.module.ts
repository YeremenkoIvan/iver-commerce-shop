import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Orders_description } from './entities/orders_description.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from '../users/entities/user.entity';
import { Items } from '../items/entities/items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Orders_description, User, Items]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
