import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Contact should not be empty' })
  @IsString()
  contact: string;
}
