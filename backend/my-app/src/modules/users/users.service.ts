import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async validateUser(
    email_f: string,
    password_f: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email_f },
    });
    if (user && (await bcrypt.compare(password_f, user.password))) {
      return user;
    }

    return null;
  }

  async toggleUserRole(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;

    return this.userRepository.save(user);
  }

  async updateProfile(
    userId: number,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.firstName !== undefined) {
      user.firstName = updateData.firstName;
    }

    if (updateData.lastName !== undefined) {
      user.lastName = updateData.lastName;
    }

    if (updateData.role !== undefined) {
      user.role = updateData.role;
    }

    return this.userRepository.save(user);
  }

  async getRoleById(userId: number): Promise<UserRole> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    return user.role;
  }

  async updateUserByEmail(
    email: string,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Користувач з email ${email} не знайдений`);
    }

    if (updateData.firstName !== undefined) {
      user.firstName = updateData.firstName;
    }

    if (updateData.lastName !== undefined) {
      user.lastName = updateData.lastName;
    }

    if (updateData.role !== undefined) {
      user.role = updateData.role;
    }

    return this.userRepository.save(user);
  }
}
