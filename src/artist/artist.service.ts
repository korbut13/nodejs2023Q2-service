import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return dataBase.artist;
  }

  getById(id: string) {
    const foundArtist = dataBase.artist.find((artist) => artist.id === id);

    if (foundArtist) {
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

    dataBase.artist.push(newArtist);
    return dataBase.artist[dataBase.artist.length - 1];
  }

  delete(id: string) {
    const artistForDelete = dataBase.artist.find((artist) => artist.id === id);
    if (artistForDelete) {
      dataBase.artist = dataBase.artist.filter((artist) => artist.id !== id);
      return null;
    } else {
      throw new Error('The artist with this id was not found');
    }
  }

  update(id: string, updateArtistDto: CreateArtistDto) {
    const artistForUpdate = dataBase.artist.find((artist) => artist.id === id);

    if (artistForUpdate !== undefined) {
      artistForUpdate.name = updateArtistDto.name;
      artistForUpdate.grammy = updateArtistDto.grammy;

      return artistForUpdate;
    } else {
      throw new Error('The artist with this id was not found');
    }
  }
}
