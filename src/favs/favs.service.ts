import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { TrackDto } from '../track/dto/track.dto';
import { AlbumDto } from '../album/dto/album.dto';
import { ArtistDto } from '../artist/dto/artist.dto';

@Injectable()
export class FavsService {
  getAll() {
    return dataBase.favs;
  }

  addTrackToFavs(trackToFavs: TrackDto) {
    dataBase.favs.tracks.push(trackToFavs.id);
    return trackToFavs;
  }

  addAlbumToFavs(albumToFavs: AlbumDto) {
    dataBase.favs.albums.push(albumToFavs.id);
    return albumToFavs;
  }

  addArtistToFavs(artistToFavs: ArtistDto) {
    dataBase.favs.artists.push(artistToFavs.id);
    return { id: artistToFavs.id };
  }

  async deleteTrack(id: string) {
    const trackId = dataBase.favs.tracks.find((trackId) => trackId === id);
    if (trackId) {
      dataBase.favs.tracks = dataBase.favs.tracks.filter(
        (trackId) => trackId !== id,
      );
    } else {
      throw new Error('The track with this id was not found');
    }
  }

  deleteAlbum(id: string) {
    const album = dataBase.favs.albums.find((album) => album === id);
    if (album) {
      dataBase.favs.albums = dataBase.favs.albums.filter(
        (album) => album !== id,
      );
    } else {
      throw new Error('The album with this id was not found');
    }
  }

  deleteArtist(id: string) {
    const artist = dataBase.favs.artists.find((artist) => artist === id);
    if (artist) {
      dataBase.favs.artists = dataBase.favs.artists.filter(
        (artist) => artist !== id,
      );
    } else {
      throw new Error('The artist with this id was not found');
    }
  }
}
