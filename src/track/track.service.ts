import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()

export class TrackService {
  db = dataBase.track;

  getAll() {
    return this.db;
  }

  getById(id: string) {
    const foundTrack: TrackDto = this.db.find(track => track.id === id);

    if (foundTrack !== undefined) {
      return foundTrack;
    } else {
      throw new Error('The track with this id was not found');
    }
  }

  create(trackDto: CreateTrackDto) {
    const idTrack = v4();

    const newTrack = {
      ...trackDto,
      id: idTrack,
    };

    this.db.push(newTrack);
    return this.db[this.db.length - 1];
  }

  delete(id: string) {
    const track = this.db.find(track => track.id === id);
    if (track) {
      this.db = this.db.filter(track => track.id !== id);
    } else {
      throw new Error('The track with this id was not found')
    }
  }

  update(id: string, updateTrackDto: CreateTrackDto) {

    const trackForUpdate = this.db.find(track => track.id === id);

    if (trackForUpdate !== undefined) {
      trackForUpdate.name = updateTrackDto.name;
      trackForUpdate.artistId = updateTrackDto.artistId;
      trackForUpdate.albumId = updateTrackDto.albumId;
      trackForUpdate.duration = updateTrackDto.duration;


      return trackForUpdate;
    } else {
      throw new Error('The track with this id was not found')
    }
  }
}
