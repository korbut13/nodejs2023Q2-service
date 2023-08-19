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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IdDto } from '../utils/id.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
