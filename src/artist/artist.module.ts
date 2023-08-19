import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { Artist } from './artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

import { ArtistsFavs } from '../favs/artists-to-favs.entity';
import { AlbumsFavs } from '../favs/albums-to-favs.entity';
import { TracksFavs } from '../favs/tracks-to-favs.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ArtistService, TrackService, AlbumService, FavsService],
  controllers: [ArtistController],
  imports: [
    TypeOrmModule.forFeature([
      Artist,
      Track,
      Album,
      ArtistsFavs,
      AlbumsFavs,
      TracksFavs,
    ]),
    forwardRef(() => AuthModule)
  ],
})
export class ArtistModule { }
