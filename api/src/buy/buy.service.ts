import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BuyService {
  constructor(private prisma: PrismaService) {}

  async listRifas() {
    const rifas = await this.prisma.rifa.findMany({ include: { seats: true } });

    if (!rifas) return [];

    return rifas;
  }

  async bookSeat({ name }, id) {
    const updatedSeat = await this.prisma.seat.update({
      where: { id },
      data: { name },
    });

    const seats = await this.prisma.seat.findMany({
      where: { rifaId: updatedSeat.rifaId },
    });

    if (!seats) return [];

    return { rifaId: updatedSeat.rifaId, seats: seats };
  }
}
