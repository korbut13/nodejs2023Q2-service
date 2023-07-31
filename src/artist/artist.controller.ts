import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistIdDto } from './dto/artist-id.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {

  }

  @Get()
  async getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param(ValidationPipe) artistId: ArtistIdDto) {
    try {
      return this.artistService.getById(artistId.id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The artist with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param(ValidationPipe) artistId: ArtistIdDto) {
    try {
      this.artistService.delete(artistId.id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The artist with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Body(ValidationPipe) updateArtistDto: CreateArtistDto, @Param(ValidationPipe) artistId: ArtistIdDto) {

    try {
      return this.artistService.update(artistId.id, updateArtistDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The artist with this id was not found',
      }, HttpStatus.NOT_FOUND);

    }
  }



}
