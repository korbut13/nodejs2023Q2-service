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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IdDto } from '../utils/id.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) artistId: IdDto) {
    try {
      return await this.artistService.getById(artistId.id);
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

  @Post()
  async create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) artistId: IdDto) {
    try {
      await this.artistService.delete(artistId.id);
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

  @Put(':id')
  async update(
    @Body(ValidationPipe) updateArtistDto: CreateArtistDto,
    @Param(ValidationPipe) artistId: IdDto,
  ) {
    try {
      return await this.artistService.update(artistId.id, updateArtistDto);
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
