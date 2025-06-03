import {
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  Req,
  Patch,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/decorators/role.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from './entities/user.entity';
import { UserDecorator } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@UserDecorator() user: { id: number }) {
    return this.usersService.getProfile(user.id);
  }

  @Put('toggle-role/:userId')
  @UseGuards(JwtAuthGuard)
  async toggleUserRole(@Param('userId') userId: number) {
    return this.usersService.toggleUserRole(userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: any, @Body() body: { user: Partial<User> }) {
    const user = req.user as { id: number };
    return this.usersService.updateProfile(user.id, body.user);
  }

  @Patch(':email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  async updateUserByEmail(
    @Param('email') email: string,
    @Body() body: { user: Partial<User> },
    @UserDecorator() currentUser: { id: number; email: string }, // текущий пользователь из токена
  ) {
    if (email === currentUser.email) {
      throw new ForbiddenException(
        'Неможливо редагувати власний аккаунт таким чином',
      );
    }

    return this.usersService.updateUserByEmail(email, body.user);
  }
}
