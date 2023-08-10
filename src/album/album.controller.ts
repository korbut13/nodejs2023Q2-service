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
import { IdDto } from '../utils/id.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

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
  async getById(@Param(ValidationPipe) { id }: IdDto) {
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
  async delete(@Param(ValidationPipe) { id }: IdDto) {
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
    @Param(ValidationPipe) { id }: IdDto,
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
