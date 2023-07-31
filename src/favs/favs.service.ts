import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { FavsDto } from './dto/favs.dto';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { TrackDto } from '../track/dto/track.dto';
import { AlbumDto } from '../album/dto/album.dto';
import { ArtistDto } from '../artist/dto/artist.dto';

@Injectable()

export class FavsService {
  db = dataBase.favs;

  getAll() {
    return this.db;
  }

  addTrackToFavs(trackToFavs: TrackDto) {
    this.db.tracks.push(trackToFavs);
    return trackToFavs;
  }

  addAlbumToFavs(albumToFavs: AlbumDto) {
    this.db.albums.push(albumToFavs);
    return albumToFavs;
  }

  addArtistToFavs(artistToFavs: ArtistDto) {
    this.db.artists.push(artistToFavs);
    return artistToFavs;
  }


  deleteTrack(id: string) {
    const track = this.db.tracks.find(track => track.id === id);
    if (track) {
      this.db.tracks = this.db.tracks.filter(track => track.id !== id);
    } else {
      throw new Error('The track with this id was not found')
    }
  }

  deleteAlbum(id: string) {
    const album = this.db.albums.find(album => album.id === id);
    if (album) {
      this.db.albums = this.db.albums.filter(album => album.id !== id);
    } else {
      throw new Error('The album with this id was not found')
    }
  }

  deleteArtist(id: string) {
    const artist = this.db.artists.find(artist => artist.id === id);
    if (artist) {
      this.db.artists = this.db.artists.filter(artist => artist.id !== id);
    } else {
      throw new Error('The artist with this id was not found')
    }
  }
}
