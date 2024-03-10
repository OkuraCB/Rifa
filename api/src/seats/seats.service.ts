import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService) {}

  async update(id: number) {
    const updatedSeat = await this.prisma.seat.update({
      where: { id },
      data: { pago: true },
    });

    const seats = await this.prisma.seat.findMany({
      where: { rifaId: updatedSeat.rifaId },
    });

    if (!seats) return [];

    return { rifaId: updatedSeat.rifaId, seats: seats };
  }

  async cancel(id: number) {
    const updatedSeat = await this.prisma.seat.update({
      where: { id },
      data: { name: '' },
    });

    const seats = await this.prisma.seat.findMany({
      where: { rifaId: updatedSeat.rifaId },
    });

    if (!seats) return [];

    return { rifaId: updatedSeat.rifaId, seats: seats };
  }
}
