import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumIdDto } from './dto/album-id.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { dataBase } from '../dataBase';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favsService: FavsService,
  ) {}

  @Get()
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      return this.albumService.getById(id);
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

  @Post()
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      this.albumService.delete(id);

      const tracksFromAlbum = dataBase.track.filter(
        (track) => track.albumId === id,
      );
      const favoriteAlbum = dataBase.favs.albums.find((album) => album === id);

      if (tracksFromAlbum.length > 0) {
        tracksFromAlbum.forEach((track) => {
          this.trackService.update(track.id, {
            name: track.name,
            artistId: track.artistId,
            albumId: null,
            duration: track.duration,
          });
        });
      }

      if (favoriteAlbum) {
        await this.favsService.deleteAlbum(favoriteAlbum);
      }
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

  @Put(':id')
  update(
    @Body(ValidationPipe) updateAlbumDto: CreateAlbumDto,
    @Param(ValidationPipe) { id }: AlbumIdDto,
  ) {
    try {
      return this.albumService.update(id, updateAlbumDto);
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
}
