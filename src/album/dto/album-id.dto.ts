import { IsUUID } from 'class-validator';

export class AlbumIdDto {
  @IsUUID('4', { message: 'Id is invalid (not uuid)' })
  id: string;
}
