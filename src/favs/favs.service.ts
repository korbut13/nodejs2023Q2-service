import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { ArtistsFavs } from './artists-to-favs.entity';
import { AlbumsFavs } from './albums-to-favs.entity';
import { TracksFavs } from './tracks-to-favs.entity';
import { AlbumService } from '../album/album.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    @InjectRepository(ArtistsFavs) private readonly artistsFavsRepository: Repository<ArtistsFavs>,
    @InjectRepository(AlbumsFavs) private readonly albumsFavsRepository: Repository<AlbumsFavs>,
    @InjectRepository(TracksFavs) private readonly tracksFavsRepository: Repository<TracksFavs>) { }

  async getAll() {
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const favsArtists = await this.artistsFavsRepository.find();
    for (let favArtist of favsArtists) {
      const artist = await this.artistService.getById(favArtist.artistId);
      response.artists.push(artist);
    }

    const favsAlbums = await this.albumsFavsRepository.find();
    for (let favAlbum of favsAlbums) {
      const album = await this.albumService.getById(favAlbum.albumId);
      response.albums.push(album);
    }

    const favsTracks = await this.tracksFavsRepository.find();
    for (let favTrack of favsTracks) {
      const track = await this.trackService.getById(favTrack.trackId);
      response.tracks.push(track);
    }

    return response;
  }

  async addTrackToFavs(id: string) {
    try {
      const track = await this.trackService.getById(id);
      const trackToFavs = this.tracksFavsRepository.create({ trackId: id })
      await this.tracksFavsRepository.save(trackToFavs);
      return track;
    } catch (error) {
      throw new Error('The track with this id was not found');
    }
  }

  async addAlbumToFavs(id: string) {
    try {
      const album = await this.albumService.getById(id);
      const albumToFavs = this.albumsFavsRepository.create({ albumId: id })
      await this.albumsFavsRepository.save(albumToFavs);
      return album;
    } catch (error) {
      throw new Error('The album with this id was not found');
    }
  }

  async addArtistToFavs(id: string) {
    try {
      const artist = await this.artistService.getById(id);
      const artistToFav = this.artistsFavsRepository.create({ artistId: id });
      await this.artistsFavsRepository.save(artistToFav);
      return artist;
    } catch (error) {
      throw new Error('The artist with this id was not found');
    }
  }

  async deleteTrack(id: string) {
    const deletedTrack = await this.tracksFavsRepository.delete({ trackId: id })
    if (!deletedTrack.affected) throw new Error('The track with this id was not found');
  }

  async deleteAlbum(id: string) {
    const deletedAlbun = await this.albumsFavsRepository.delete({ albumId: id })
    if (!deletedAlbun.affected) throw new Error('The album with this id was not found');
  }

  async deleteArtist(id: string) {
    const deletedArtist = await this.artistsFavsRepository.delete({ artistId: id });
    if (!deletedArtist.affected) throw new Error('The artist with this id was not found');
  }
}
