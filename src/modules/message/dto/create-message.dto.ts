import { IsEmpty } from 'class-validator';

export class createMessageDto {
  constructor(
    public toPhone: string,
    public content: string,
    public fromPhone: string,
  ) {}
}
