import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/orders.entity';
import { Orders_description } from './entities/orders_description.entity';
import { Items } from '../items/entities/items.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,

    @InjectRepository(Orders_description)
    private readonly orderDescriptionRepository: Repository<Orders_description>,

    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Orders> {
    return this.ordersRepository.manager.transaction(async (manager) => {
      // Получаем id продуктов из DTO
      const productIDs = createOrderDto.items.map((item) => item.productId);
      console.log('userId from token:', userId);

      // Проверяем наличие всех продуктов в базе
      const products = await this.itemsRepository.find({
        where: { id: In(productIDs) },
      });
      console.log('2');

      const foundIDs = products.map((p) => p.id);
      const missingIDs = productIDs.filter((id) => !foundIDs.includes(id));

      if (missingIDs.length > 0) {
        throw new NotFoundException(
          `Products not found: ${missingIDs.join(', ')}`,
        );
      }

      // Создаём карту productId -> price для подсчёта суммы
      const productPriceMap = new Map(products.map((p) => [p.id, p.price]));

      // Считаем общую сумму заказа
      const amount = createOrderDto.items.reduce((acc, item) => {
        const price = productPriceMap.get(item.productId);
        if (price === undefined) {
          throw new Error(`Price not found for product ${item.productId}`);
        }
        return acc + price * item.quantity;
      }, 0);

      // Находим пользователя
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      console.log('3');

      // Сохраняем заказ
      const order = await manager.save(Orders, {
        amount,
        user,
      });

      // Формируем описание заказа (связь заказ-товары)
      const orderItems = createOrderDto.items.map((item) => ({
        quantity: item.quantity,
        order: { id: order.id },
        product: { id: item.productId },
      }));

      await manager.insert(Orders_description, orderItems);

      // Возвращаем заказ с товарами и продуктами (связи)
      return manager.findOneOrFail(Orders, {
        where: { id: order.id },
        relations: ['items', 'items.product'],
      });
    });
  }

  async findAll(): Promise<Orders[]> {
    return this.ordersRepository.find({
      relations: {
        user: true, // связь с пользователем
        items: {
          product: true, // связь с продуктом через items
        },
      },
    });
  }

  async findUserOrders(userId: number): Promise<Orders[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } }, // фильтр по id пользователя
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });
  }
}
