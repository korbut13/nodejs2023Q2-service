import { IsUUID } from 'class-validator'

export class UserIdDto {
  @IsUUID('4', { message: 'userId is invalid (not uuid)' })
  id: string;
}
