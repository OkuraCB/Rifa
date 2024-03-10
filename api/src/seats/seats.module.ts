import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService, PrismaService],
  exports: [SeatsService],
})
export class SeatsModule {}
