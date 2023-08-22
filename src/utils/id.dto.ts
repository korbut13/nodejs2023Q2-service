import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID('4', { message: 'Id is invalid (not uuid)' })
  id: string;
}
