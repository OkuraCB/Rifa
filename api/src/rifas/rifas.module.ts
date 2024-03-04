import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';

@Module({
  controllers: [RifasController],
  providers: [RifasService, PrismaService],
  exports: [RifasService],
})
export class RifasModule {}
