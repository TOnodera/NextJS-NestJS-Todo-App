import { User } from './user/entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
export type Payload = { sub: string; userName: string };

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
