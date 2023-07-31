import { UserDto } from "./user/dto/user.dto";
import { ArtistDto } from "./artist/dto/artist.dto";
import { AlbumDto } from "./album/dto/album.dto";

export const dataBase: {
  user: UserDto[],
  artist: ArtistDto[],
  album: AlbumDto[],
} = {
  user: [],
  artist: [],
  album: [],
};
