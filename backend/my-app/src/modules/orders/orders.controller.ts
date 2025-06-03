import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Orders } from './entities/orders.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { Role } from '../auth/decorators/role.decorator';

interface AuthenticatedRequest extends Request {
  user: { id: number; email?: string; role?: string };
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Role(UserRole.ADMIN)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('req.user:', req.user); // 👈
    const userId = req.user.id; //
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  async getOrders() {
    return this.ordersService.findAll();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getMyOrders(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id; // userId из JWT
    return this.ordersService.findUserOrders(userId);
  }
}
