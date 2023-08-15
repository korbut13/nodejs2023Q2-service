import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { Artist } from './artist.entity';
import { ArtistsFavs } from '../favs/artists-to-favs.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(ArtistsFavs)
    private readonly artistsFavsRepository: Repository<ArtistsFavs>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async getById(id: string) {
    const foundArtist = await this.artistRepository.findOneBy({ id: id });
    if (!foundArtist) throw new Error('The artist with this id was not found');
    return foundArtist;
  }

  async create(artistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artistDto);
    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async delete(id: string) {
    const albums = await this.albumService.getByArtistId(id);
    const tracks = await this.trackService.getByArtistId(id);
    const favoriteArtist = await this.artistsFavsRepository.find({
      where: { artistId: id },
    });

    if (albums.length) {
      albums.forEach(
        async (album) =>
          await this.albumService.update(album.id, {
            ...album,
            artistId: null,
          }),
      );
    }
    if (tracks.length) {
      tracks.forEach(
        async (track) =>
          await this.trackService.update(track.id, {
            ...track,
            artistId: null,
          }),
      );
    }
    if (favoriteArtist) {
      await this.artistsFavsRepository.delete({ artistId: id });
    }
    const deletedArtist = await this.artistRepository.delete(id);
    if (!deletedArtist.affected)
      throw new Error('The artist with this id was not found');
    return null;
  }

  async update(id: string, updateArtistDto: CreateArtistDto) {
    await this.artistRepository.update(id, updateArtistDto);
    return await this.getById(id);
  }
}
