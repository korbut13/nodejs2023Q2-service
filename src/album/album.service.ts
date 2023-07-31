import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()

export class AlbumService {
  db = dataBase.album;

  getAll() {
    return this.db;
  }

  async getById(id: string) {
    const foundAlbum: AlbumDto = this.db.find(album => album.id === id);

    if (foundAlbum !== undefined) {
      return foundAlbum;
    } else {
      throw new Error('The album with this id was not found');
    }
  }

  create(albumDto: CreateAlbumDto) {
    const idAlbum = v4();

    const newAlbum = {
      ...albumDto,
      id: idAlbum,
    };

    this.db.push(newAlbum);
    return this.db[this.db.length - 1];
  }

  delete(id: string) {
    const album = this.db.find(album => album.id === id);
    if (album) {
      this.db = this.db.filter(album => album.id !== id);
    } else {
      throw new Error('The album with this id was not found')
    }
  }

  update(id: string, updateAlbumDto: CreateAlbumDto) {

    const albumForUpdate = this.db.find(album => album.id === id);

    if (albumForUpdate !== undefined) {
      albumForUpdate.name = updateAlbumDto.name;
      albumForUpdate.year = updateAlbumDto.year;
      albumForUpdate.artistId = updateAlbumDto.artistId;

      return albumForUpdate;
    } else {
      throw new Error('The album with this id was not found')
    }
  }
}
