import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { v4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()

export class TrackService {

  getAll() {
    return dataBase.track;
  }

  getById(id: string) {
    const foundTrack: TrackDto = dataBase.track.find(track => track.id === id);

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

    dataBase.track.push(newTrack);
    return dataBase.track[dataBase.track.length - 1];
  }

  delete(id: string) {
    const track = dataBase.track.find(track => track.id === id);
    if (track) {
      dataBase.track = dataBase.track.filter(track => track.id !== id);
    } else {
      throw new Error('The track with this id was not found')
    }
  }

  async update(id: string, updateTrackDto: CreateTrackDto) {

    const trackForUpdate = dataBase.track.find(track => track.id === id);

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
