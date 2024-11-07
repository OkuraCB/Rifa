import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SeatDto } from 'src/seats/dto/expose/seat.dto';
import { UserDto } from 'src/users/dto/expose/user.dto';

export class RifaDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  end: Date;

  @Expose()
  @Type(() => SeatDto)
  @ValidateNested({ each: true })
  seats: SeatDto[];

  @Expose()
  @Type(() => UserDto)
  @ValidateNested({ each: true })
  owners: UserDto[];

  @Expose()
  price: number;
}
