// import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
// import { ArtistService } from './artist.service';
// import { CreateArtistDto } from './dto/create-artist.dto';
// import { ArtistIdDto } from './dto/artist-id.dto';
// import { AlbumService } from '../album/album.service';
// import { dataBase } from '../dataBase';

// @Controller('artist')
// export class ArtistController {
//   dbAlbums = dataBase.album;

//   constructor(private readonly artistService: ArtistService, private readonly albumService: AlbumService) {
//   }

//   @Get()
//   async getAll() {
//     return this.artistService.getAll();
//   }

//   @Get(':id')
//   getById(@Param(ValidationPipe) artistId: ArtistIdDto) {
//     try {
//       return this.artistService.getById(artistId.id);
//     } catch (error) {
//       throw new HttpException({
//         status: HttpStatus.NOT_FOUND,
//         error: 'The artist with this id was not found',
//       }, HttpStatus.NOT_FOUND);
//     }
//   }

//   @Post()
//   create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
//     return this.artistService.create(createArtistDto)
//   }

//   @Delete(':id')
//   @HttpCode(204)
//   delete(@Param(ValidationPipe) artistId: ArtistIdDto) {
//     try {
//       this.artistService.delete(artistId.id);

//       const albumDeletedArtist = this.dbAlbums.find(album => album.artistId === artistId.id);

//       const idAlbumForUpdate = albumDeletedArtist.id;
//       const updateAlbum = { name: albumDeletedArtist.name, year: albumDeletedArtist.year, artistId: null };
//       this.albumService.update(idAlbumForUpdate, updateAlbum);

//     } catch (error) {
//       throw new HttpException({
//         status: HttpStatus.NOT_FOUND,
//         error: 'The artist with this id was not found',
//       }, HttpStatus.NOT_FOUND);
//     }
//   }

//   @Put(':id')
//   update(@Body(ValidationPipe) updateArtistDto: CreateArtistDto, @Param(ValidationPipe) artistId: ArtistIdDto) {

//     try {
//       return this.artistService.update(artistId.id, updateArtistDto);

//     } catch (error) {
//       throw new HttpException({
//         status: HttpStatus.NOT_FOUND,
//         error: 'The artist with this id was not found',
//       }, HttpStatus.NOT_FOUND);

//     }
//   }
// }

import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistIdDto } from './dto/artist-id.dto';
import { dataBase } from '../dataBase';

@Controller('artist')
export class ArtistController {
  dbAlbums = dataBase.album;

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
      this.artistService.delete(artistId.id);

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
