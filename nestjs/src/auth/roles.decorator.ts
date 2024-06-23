import { Reflector } from '@nestjs/core';
import { Role } from 'src/type';

export const Roles = Reflector.createDecorator<Role[]>();
