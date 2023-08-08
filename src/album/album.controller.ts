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
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
  ) { }

  @Get()
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      return await this.albumService.getById(id);
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
  async create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      await this.albumService.delete(id);
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
  async update(
    @Body(ValidationPipe) updateAlbumDto: CreateAlbumDto,
    @Param(ValidationPipe) { id }: AlbumIdDto,
  ) {
    try {
      return await this.albumService.update(id, updateAlbumDto);
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
