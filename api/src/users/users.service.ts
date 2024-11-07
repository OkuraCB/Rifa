import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserNotFoundError } from './errors/notFound.error';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async list(id: number) {
    const owners = await this.prisma.user.findMany({
      where: { rifas: { some: { id: id } } },
    });

    if (!owners) return [];

    return owners;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
