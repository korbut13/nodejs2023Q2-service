import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()

export class AlbumService {

  getAll() {
    return dataBase.album;
  }

  getById(id: string) {
    const foundAlbum: AlbumDto = dataBase.album.find(album => album.id === id);

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

    dataBase.album.push(newAlbum);
    return dataBase.album[dataBase.album.length - 1];
  }

  delete(id: string) {
    const album = dataBase.album.find(album => album.id === id);
    if (album) {
      dataBase.album = dataBase.album.filter(album => album.id !== id);
    } else {
      throw new Error('The album with this id was not found')
    }
  }

  update(id: string, updateAlbumDto: CreateAlbumDto) {

    const albumForUpdate = dataBase.album.find(album => album.id === id);

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
