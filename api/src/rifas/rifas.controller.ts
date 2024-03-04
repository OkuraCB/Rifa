import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AddRifaDto } from './dto/body/addRifa.dto';
import { RifaDto } from './dto/expose/rifa.dto';
import { RifasService } from './rifas.service';

@UseGuards(JwtAuthGuard)
@Controller('rifas')
export class RifasController {
  constructor(private rifasService: RifasService) {}

  @Serialize(RifaDto)
  @Get()
  async list() {
    return await this.rifasService.list();
  }

  @Post()
  async create(@Body() body: AddRifaDto) {
    return await this.rifasService.add(body);
  }
}
