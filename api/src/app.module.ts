import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { BuyModule } from './buy/buy.module';
import { RifasModule } from './rifas/rifas.module';
import { SeatsModule } from './seats/seats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, RifasModule, SeatsModule, BuyModule],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AppModule {}
