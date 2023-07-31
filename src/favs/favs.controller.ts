import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackIdDto } from '../track/dto/track-id.dto';

import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  getAll() {
    const favIds = this.favsService.getAll();
    const resp = {
      artists: [],
      albums: [],
      tracks: [],
    };

    favIds.artists.forEach((artistId) => {
      const artist = this.artistService.getById(artistId);
      resp.artists.push(artist);
    });

    favIds.albums.forEach((albumId) => {
      const album = this.albumService.getById(albumId);
      resp.albums.push(album);
    });

    favIds.tracks.forEach((trackId) => {
      const track = this.trackService.getById(trackId);
      resp.tracks.push(track);
    });

    return resp;
  }

  @Post('/track/:id')
  async tracks(
    @Body() trackToFavs: any,
    @Param(ValidationPipe) { id }: TrackIdDto,
  ) {
    try {
      const foundTrack = this.trackService.getById(id);
      return this.favsService.addTrackToFavs({ ...trackToFavs, ...foundTrack });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'The track with this id was not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('/album/:id')
  async addAlbumToFavs(
    @Body() albumToFavs: any,
    @Param(ValidationPipe) { id }: TrackIdDto,
  ) {
    try {
      const foundAlbum = this.albumService.getById(id);
      return this.favsService.addAlbumToFavs({ ...albumToFavs, ...foundAlbum });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'The track with this id was not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('/artist/:id')
  addArtistToFavs(
    @Body() artistToFavs: any,
    @Param(ValidationPipe) { id }: TrackIdDto,
  ) {
    try {
      const foundArtist = this.artistService.getById(id);
      if (foundArtist) {
        return this.favsService.addArtistToFavs({
          ...artistToFavs,
          ...foundArtist,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'The track with this id was not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteTrack(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The track with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteAlbum(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The album with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param(ValidationPipe) { id }: TrackIdDto) {
    try {
      this.favsService.deleteArtist(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The artist with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
