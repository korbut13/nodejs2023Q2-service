import { IsUUID } from 'class-validator';

export class ArtistIdDto {
  @IsUUID('4', { message: 'Id is invalid (not uuid)' })
  id: string;
}
