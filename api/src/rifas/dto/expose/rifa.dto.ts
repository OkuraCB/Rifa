import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SeatDto } from './seat.dto';

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
}
