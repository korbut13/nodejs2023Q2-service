import { IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator'

export class ArtistDto {
  @IsUUID('4', { message: 'artistId is invalid (not uuid)' })
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
