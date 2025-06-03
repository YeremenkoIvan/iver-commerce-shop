import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Items } from './entities/items.entity';
import { CreateItemsDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemRepository: Repository<Items>,
  ) {}

  async findAll(search?: string): Promise<Items[]> {
    if (search) {
      return this.itemRepository.find({
        where: { name: ILike(`%${search}%`) },
      });
    }
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Items | null> {
    return this.itemRepository.findOne({ where: { id } });
  }

  async create(createItemDto: CreateItemsDto): Promise<Items> {
    const newProduct = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(newProduct);
  }

  async updateItemById(
    id: number,
    updateData: Partial<Items>,
  ): Promise<Items | null> {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Товар з id ${id} не знайдений`);
    }

    if (updateData.name !== undefined) {
      item.name = updateData.name;
    }

    if (updateData.price !== undefined) {
      item.price = updateData.price;
    }

    if (updateData.description !== undefined) {
      item.description = updateData.description;
    }

    return this.itemRepository.save(item);
  }
}
