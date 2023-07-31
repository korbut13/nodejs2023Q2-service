import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackDto } from '../track/dto/track.dto';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { TrackIdDto } from '../track/dto/track-id.dto';

import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';


@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService) {
  }

  @Get()
  async getAll() {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  async addTrackToFavs(@Body() trackToFavs: any, @Param(ValidationPipe) { id }: TrackIdDto) {
    const foundTrack = await this.trackService.getById(id);
    return this.favsService.addTrackToFavs({ ...trackToFavs, ...foundTrack });
  }

  @Post('/album/:id')
  async addAlbumToFavs(@Body() albumToFavs: any, @Param(ValidationPipe) { id }: TrackIdDto) {
    const foundAlbum = await this.albumService.getById(id);
    return this.favsService.addAlbumToFavs({ ...albumToFavs, ...foundAlbum });
  }

  @Post('/artist/:id')
  async addArtistToFavs(@Body() artistToFavs: any, @Param(ValidationPipe) { id }: TrackIdDto) {
    const foundArtist = await this.artistService.getById(id);
    return this.favsService.addArtistToFavs({ ...artistToFavs, ...foundArtist });
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteTrack(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The track with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteAlbum(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The album with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }
  @Delete('/track/:id')
  @HttpCode(204)
  deleteArtist(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteArtist(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The artist with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

}
