import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/track.entity';
import { Album } from './album.entity';
import { ArtistsFavs } from '../favs/artists-to-favs.entity';
import { AlbumsFavs } from '../favs/albums-to-favs.entity';
import { TracksFavs } from '../favs/tracks-to-favs.entity';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/artist.entity';

@Module({
  providers: [AlbumService, TrackService, FavsService, ArtistService],
  controllers: [AlbumController],
  imports: [
    TypeOrmModule.forFeature([
      Album,
      Track,
      Artist,
      ArtistsFavs,
      AlbumsFavs,
      TracksFavs,
    ]),
  ],
})
export class AlbumModule {}
