import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { Items } from './entities/items.entity';
import { ItemsService } from './items.service';
import { CreateItemsDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/decorators/role.decorator';
import { UserRole } from '../users/entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.itemsService.findAll(search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  async create(@Body() body: { item: CreateItemsDto }) {
    return this.itemsService.create(body.item);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  async updateItemById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { item: Partial<Items> },
  ) {
    return this.itemsService.updateItemById(id, body.item);
  }
}
