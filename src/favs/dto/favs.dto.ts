import { ArtistDto } from "../../artist/dto/artist.dto";
import { AlbumDto } from "../../album/dto/album.dto";
import { TrackDto } from "../../track/dto/track.dto";

export class FavsDto {
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
