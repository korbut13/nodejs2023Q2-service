import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackIdDto } from './dto/track-id.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { dataBase } from '../dataBase';
import { FavsService } from '../favs/favs.service';

@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService,
    private readonly favsService: FavsService) {
  }
  @Get()
  async getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      return this.trackService.getById(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The album with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.trackService.delete(id);
      const favoriteTrack = dataBase.favs.tracks.find(track => track === id);

      if (favoriteTrack) {
        await this.favsService.deleteTrack(favoriteTrack);
      }


    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The track with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Body(ValidationPipe) updateTrackDto: CreateTrackDto, @Param(ValidationPipe) { id }: TrackIdDto) {

    try {
      return await this.trackService.update(id, updateTrackDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The track with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

}
