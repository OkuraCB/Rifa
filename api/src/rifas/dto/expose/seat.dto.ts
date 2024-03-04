import { Expose } from 'class-transformer';

export class SeatDto {
  @Expose()
  id: number;

  @Expose()
  seat: number;

  @Expose()
  state: string;
}
