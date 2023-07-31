import { UserDto } from './user/dto/user.dto';
import { ArtistDto } from './artist/dto/artist.dto';
import { AlbumDto } from './album/dto/album.dto';
import { TrackDto } from './track/dto/track.dto';
import { FavsDto } from './favs/dto/favs.dto';

export const dataBase: {
  user: UserDto[];
  artist: ArtistDto[];
  album: AlbumDto[];
  track: TrackDto[];
  favs: FavsDto;
} = {
  user: [],
  artist: [],
  album: [],
  track: [],
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
