import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddOwnerDto {
  @IsNotEmpty({ message: 'You should search for a user first' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'Please select a Rifa' })
  @IsNumber()
  rifaId: number;
}
