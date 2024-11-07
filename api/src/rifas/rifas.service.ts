import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { PrismaService } from 'src/prisma.service';
import { AddRifaDto } from './dto/body/addRifa.dto';

@Injectable()
export class RifasService {
  constructor(private prisma: PrismaService) {}

  async list(user: IUser) {
    if (user.role === 'ADMIN') {
      const rifas = await this.prisma.rifa.findMany({
        include: { seats: true },
      });

      if (!rifas) return [];

      return rifas;
    } else {
      const rifas = await this.prisma.rifa.findMany({
        where: { owners: { some: { id: user.userId } } },
        include: { seats: true },
      });

      if (!rifas) return [];

      return rifas;
    }
  }

  async add(body: AddRifaDto, user: IUser) {
    const rifa = await this.prisma.rifa.create({
      data: {
        name: body.name,
        end: body.end,
        price: body.price,
        owners: { connect: { id: user.userId } },
      },
    });

    for (let index = 0; index < body.seats; index++) {
      await this.prisma.seat.create({
        data: {
          seat: index + 1,
          rifa: { connect: { id: rifa.id } },
        },
      });
    }

    return await this.prisma.rifa.findFirst({
      where: { id: rifa.id },
      include: { seats: true },
    });
  }
}
