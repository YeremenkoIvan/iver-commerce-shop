import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.id) {
      throw new UnauthorizedException('Пользователь не найден в запросе');
    }

    const userRole = await this.usersService.getRoleById(user.id);

    if (!userRole) {
      throw new UnauthorizedException('Роль пользователя не найдена');
    }

    console.log(`User ID: ${user.id}, Role: ${userRole}`);

    return userRole === requiredRole;
  }
}
