import { IsEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmpty({
    message: 'Phone number cannot be changed',
  })
  phone: string;
}
