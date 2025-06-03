// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: (req) => req.headers.authorization?.split(' ')[1], // Извлекаем токен из заголовка Authorization
      secretOrKey: 'secretKey', // Используем тот же секретный ключ, что и при генерации токена
    });
  }

  async validate(payload: any) {
    // Здесь возвращаем информацию о пользователе из payload токена
    console.log('JWT Payload:', payload);
    return { id: payload.sub, username: payload.username };
  }
}
