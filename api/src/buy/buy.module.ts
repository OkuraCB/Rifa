import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';

@Module({
  controllers: [BuyController],
  providers: [BuyService, PrismaService],
  exports: [BuyService],
})
export class BuyModule {}
