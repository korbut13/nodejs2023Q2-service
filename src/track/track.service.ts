import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {

  constructor(@InjectRepository(Track) private readonly trackRepository: Repository<Track>) { }

  async getAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  getById(id: string) {
    const foundedTrack = this.trackRepository.findOneBy({ id: id });
    if (!foundedTrack) throw new Error('The track with this id was not found');
    return foundedTrack;
  }

  async getByArtistId(id: string) {
    const tracks = await this.trackRepository.find({
      where: { artistId: id }
    });
    return tracks;
  }

  async getByAlbumId(id: string) {
    const tracks = await this.trackRepository.find({
      where: { albumId: id }
    });
    return tracks;
  }

  async create(trackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(trackDto);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async delete(id: string) {
    const deletedTrack = await this.trackRepository.delete(id);
    if (!deletedTrack.affected) throw new Error('The track with this id was not found');
  }

  async update(id: string, updateTrackDto: CreateTrackDto) {
    await this.trackRepository.update(id, updateTrackDto);
    return await this.getById(id)
  }
}
