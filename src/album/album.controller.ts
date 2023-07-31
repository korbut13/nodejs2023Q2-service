import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumIdDto } from './dto/album-id.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {
  }

  @Get()
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getById(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      return this.albumService.getById(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The album with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param(ValidationPipe) { id }: AlbumIdDto) {
    try {
      this.albumService.delete(id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The album with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Body(ValidationPipe) updateAlbumDto: CreateAlbumDto, @Param(ValidationPipe) { id }: AlbumIdDto) {

    try {
      return this.albumService.update(id, updateAlbumDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The album with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

}
