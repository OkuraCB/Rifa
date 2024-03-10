import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SeatUpdateDto } from './dto/expose/seatUpdate.dto';
import { SeatsService } from './seats.service';

@UseGuards(JwtAuthGuard)
@Controller('seats')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  @Serialize(SeatUpdateDto)
  @Patch('/:id')
  async update(@Param('id') id: number) {
    return await this.seatsService.update(id);
  }

  @Serialize(SeatUpdateDto)
  @Patch('/cancel/:id')
  async cancel(@Param('id') id: number) {
    return await this.seatsService.cancel(id);
  }
}
