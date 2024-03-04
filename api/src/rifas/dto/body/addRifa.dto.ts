import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRifaDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Date should not be empty' })
  @IsDateString()
  end: Date;

  @IsNotEmpty({ message: 'Seats should not be empty' })
  @IsNumber()
  seats: number;
}
