import { UserRole } from 'src/modules/users/entities/user.entity';

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email?: string;
      role?: UserRole;
    };
  }
}
