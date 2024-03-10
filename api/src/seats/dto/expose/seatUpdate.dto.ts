import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SeatDto } from './seat.dto';

export class SeatUpdateDto {
  @Expose()
  rifaId: number;

  @Expose()
  @Type(() => SeatDto)
  @ValidateNested({ each: true })
  seats: SeatDto[];
}
