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
import { ArtistIdDto } from './dto/artist-id.dto';
import { dataBase } from '../dataBase';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favsService: FavsService,
  ) { }

  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) artistId: ArtistIdDto) {
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
  async delete(@Param(ValidationPipe) artistId: ArtistIdDto) {
    try {
      await this.artistService.delete(artistId.id);

      const tracksThisArtist = dataBase.track.filter(
        (track) => track.artistId === artistId.id,
      );
      const albumsThisArtist = dataBase.album.filter(
        (album) => album.artistId === artistId.id,
      );
      const favoriteArtist = dataBase.favs.artists.find(
        (artist) => artist === artistId.id,
      );

      if (tracksThisArtist.length > 0) {
        tracksThisArtist.forEach(async (track) => {
          await this.trackService.update(track.id, {
            name: track.name,
            artistId: null,
            albumId: track.albumId,
            duration: track.duration,
          });
        });
      }

      if (albumsThisArtist.length > 0) {
        albumsThisArtist.forEach(async (album) => {
          this.albumService.update(album.id, {
            name: album.name,
            year: album.year,
            artistId: null,
          });
        });
      }

      if (favoriteArtist) {
        const idArtist = favoriteArtist;
        this.favsService.deleteArtist(idArtist);
      }
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
    @Param(ValidationPipe) artistId: ArtistIdDto,
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
