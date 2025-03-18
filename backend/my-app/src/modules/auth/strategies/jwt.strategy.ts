import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Автоматически извлекает токен
      ignoreExpiration: false, // ✅ Проверяет срок действия токена
      secretOrKey: configService.get<string>('JWT_SECRET'), // ✅ Берем секретный ключ из .env
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return { id: payload.sub, email: payload.email, role: payload.role }; // ✅ Возвращаем данные пользователя
  }
}
