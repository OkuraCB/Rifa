import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { PrismaService } from 'src/prisma.service';
import { AddOwnerDto } from './dto/body/addOwner.dto';
import { AddRifaDto } from './dto/body/addRifa.dto';
import { OwnerFoundError } from './errors/OwnerFound.error';
import { OwnerNotFoundError } from './errors/OwnerNotFound.error';

@Injectable()
export class RifasService {
  constructor(private prisma: PrismaService) {}

  async list(user: IUser) {
    if (user.role === 'ADMIN') {
      const rifas = await this.prisma.rifa.findMany({
        include: { seats: true, owners: true },
      });

      if (!rifas) return [];

      return rifas;
    } else {
      const rifas = await this.prisma.rifa.findMany({
        where: { owners: { some: { id: user.userId } } },
        include: { seats: true, owners: true },
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

  async addOwner(body: AddOwnerDto) {
    const find = await this.prisma.rifa.findFirst({
      where: { id: body.rifaId, owners: { some: { id: body.userId } } },
    });

    if (find) throw new OwnerFoundError();

    const newOwner = await this.prisma.rifa.update({
      where: { id: body.rifaId },
      data: { owners: { connect: { id: body.userId } } },
      include: { owners: true, seats: true },
    });

    return newOwner;
  }

  async removeOwner(body: AddOwnerDto) {
    const find = await this.prisma.rifa.findFirst({
      where: { id: body.rifaId, owners: { some: { id: body.userId } } },
    });

    if (!find) throw new OwnerNotFoundError();

    const newOwner = await this.prisma.rifa.update({
      where: { id: body.rifaId },
      data: { owners: { disconnect: { id: body.userId } } },
      include: { owners: true, seats: true },
    });

    console.log(newOwner);
    return newOwner;
  }
}
