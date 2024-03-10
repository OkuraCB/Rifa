import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BuyModule } from './buy/buy.module';
import { RifasModule } from './rifas/rifas.module';
import { SeatsModule } from './seats/seats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, RifasModule, SeatsModule, BuyModule],
})
export class AppModule {}
