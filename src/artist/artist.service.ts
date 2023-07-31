import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { ArtistDto } from './dto/artist.dto';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()

export class ArtistService {
  db = dataBase.artist;

  getAll() {
    return this.db;
  }

  getById(id: string) {
    const foundArtist: ArtistDto = this.db.find(artist => artist.id === id);

    if (foundArtist !== undefined) {
      return foundArtist;
    } else {
      throw new Error('The artist with this id was not found');
    }
  }

  create(artistDto: CreateArtistDto) {
    const idArtist = v4();

    const newArtist = {
      ...artistDto,
      id: idArtist,
    };

    this.db.push(newArtist);
    return this.db[this.db.length - 1];
  }

  delete(id: string) {
    const artistForDelete = this.db.find(artist => artist.id === id);
    if (artistForDelete) {
      this.db = this.db.filter(artist => artist.id !== id);
    } else {
      throw new Error('The artist with this id was not found')
    }
  }

  update(id: string, updateArtistDto: CreateArtistDto) {

    const artistForUpdate = this.db.find(artist => artist.id === id);

    if (artistForUpdate !== undefined) {
      artistForUpdate.name = updateArtistDto.name;
      artistForUpdate.grammy = updateArtistDto.grammy;

      return artistForUpdate;
    } else {
      throw new Error('The artist with this id was not found')
    }
  }
}
