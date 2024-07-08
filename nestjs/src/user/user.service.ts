import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserWithoutPassword } from 'src/type';
import { hash } from 'bcryptjs';
import { HASH_ROUND } from 'src/const';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<UserWithoutPassword> {
    const hashedPassword = await hash(createUserInput.password, HASH_ROUND);
    const { password, ...result } = await this.prismaService.users.create({
      data: {
        name: createUserInput.name,
        email: createUserInput.email,
        password: hashedPassword,
        role: { connect: { id: createUserInput.roleId } },
      },
    });
    return result;
  }

  async findAll() {
    return await this.prismaService.users.findMany({ include: { role: true } });
  }

  async findOne(id: number) {
    return await this.prismaService.users.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.users.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.prismaService.users.update({
      where: { id },
      data: { ...updateUserInput },
    });
  }

  async remove(id: number) {
    await this.prismaService.users.delete({ where: { id } });
  }
}
