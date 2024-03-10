import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddRifaDto } from './dto/body/addRifa.dto';

@Injectable()
export class RifasService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const rifas = await this.prisma.rifa.findMany({ include: { seats: true } });

    if (!rifas) return [];

    return rifas;
  }

  async add(body: AddRifaDto) {
    const rifa = await this.prisma.rifa.create({
      data: { name: body.name, end: body.end, price: body.price },
    });

    const seats = [];

    for (let index = 0; index < body.seats; index++) {
      seats.push(
        this.prisma.seat.create({
          data: {
            seat: index + 1,
            rifa: { connect: { id: rifa.id } },
          },
        }),
      );
    }

    await Promise.all(seats);

    return await this.prisma.rifa.findFirst({
      where: { id: rifa.id },
      include: { seats: true },
    });
  }
}
