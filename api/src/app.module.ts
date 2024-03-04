import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RifasModule } from './rifas/rifas.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, RifasModule],
})
export class AppModule {}
