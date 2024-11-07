import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/expose/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Serialize(UserDto)
  @Get('/rifa/:id')
  async update(@Param('id') id: number) {
    return await this.usersService.list(id);
  }

  @Serialize(UserDto)
  @Get('/email/')
  async findByEmail(@Query() query) {
    return await this.usersService.findByEmail(query.email);
  }
}
