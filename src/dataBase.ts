import { UserDto } from "./user/dto/user.dto";
import { ArtistDto } from "./artist/dto/artist.dto";
import { AlbumDto } from "./album/dto/album.dto";
import { TrackDto } from "./track/dto/track.dto";

export const dataBase: {
  user: UserDto[],
  artist: ArtistDto[],
  album: AlbumDto[],
  track: TrackDto[],
} = {
  user: [],
  artist: [],
  album: [],
  track: [],
};
