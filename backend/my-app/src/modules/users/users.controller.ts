import { Controller, Get, UseGuards, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/decorators/role.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Put('toggle-role/:userId')
  @UseGuards(JwtAuthGuard)
  async toggleUserRole(@Param('userId') userId: number) {
    return this.usersService.toggleUserRole(userId);
  }
}
