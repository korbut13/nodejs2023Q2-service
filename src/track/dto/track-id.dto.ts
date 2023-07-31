import { IsUUID } from 'class-validator'

export class TrackIdDto {
  @IsUUID('4', { message: 'Id is invalid (not uuid)' })
  id: string;
}
