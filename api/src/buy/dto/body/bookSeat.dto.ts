import { IsNotEmpty, IsString } from 'class-validator';

export class BookSeatDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;
}
