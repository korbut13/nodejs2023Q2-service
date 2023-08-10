import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.entity';
import { TrackService } from '../track/track.service';
import { AlbumsFavs } from '../favs/albums-to-favs.entity';


@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    @InjectRepository(Album) private readonly albumRepository: Repository<Album>,
    @InjectRepository(AlbumsFavs) private readonly albumsFavsRepository: Repository<AlbumsFavs>,) { }

  async getAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async getById(id: string) {
    const foundAlbum = await this.albumRepository.findOneBy({ id: id });
    if (!foundAlbum) throw new Error('The album with this id was not found');
    return foundAlbum
  }

  async getByArtistId(id: string) {
    const albums = await this.albumRepository.find({
      where: { artistId: id }
    });
    return albums;
  }

  async create(albumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(albumDto);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async delete(id: string) {
    const tracks = await this.trackService.getByAlbumId(id);
    const favoriteAlbum = await this.albumsFavsRepository.find({ where: { albumId: id } });

    if (tracks.length) {
      tracks.forEach(async track => await this.trackService.update(track.id, { ...track, albumId: null }))
    }
    if (favoriteAlbum) {
      await this.albumsFavsRepository.delete({ albumId: id });
    }

    const deletedAlbum = await this.albumRepository.delete(id);
    if (!deletedAlbum.affected) throw new Error('The album with this id was not found');
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto) {
    await this.albumRepository.update(id, updateAlbumDto);
    return await this.getById(id);
  }
}
