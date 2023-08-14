import {
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
import { IdDto } from '../utils/id.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post('/track/:id')
  async tracks(@Param(ValidationPipe) { id }: IdDto) {
    try {
      return await this.favsService.addTrackToFavs(id);
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
  async addAlbumToFavs(@Param(ValidationPipe) { id }: IdDto) {
    try {
      return await this.favsService.addAlbumToFavs(id);
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
  async addArtistToFavs(@Param(ValidationPipe) { id }: IdDto) {
    try {
      return await this.favsService.addArtistToFavs(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'The artist with this id was not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.favsService.deleteTrack(id);
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
  async deleteAlbum(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.favsService.deleteAlbum(id);
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
  async deleteArtist(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.favsService.deleteArtist(id);
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
