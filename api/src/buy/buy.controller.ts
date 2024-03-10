import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RifaDto } from 'src/rifas/dto/expose/rifa.dto';
import { SeatUpdateDto } from 'src/seats/dto/expose/seatUpdate.dto';
import { BuyService } from './buy.service';
import { BookSeatDto } from './dto/body/bookSeat.dto';

@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Serialize(RifaDto)
  @Get()
  async list() {
    return await this.buyService.listRifas();
  }

  @Serialize(SeatUpdateDto)
  @Post('/:id')
  async bookSeat(@Param('id') id: number, @Body() body: BookSeatDto) {
    return await this.buyService.bookSeat(body, id);
  }
}
