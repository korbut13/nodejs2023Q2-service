import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsService } from '../favs/favs.service';
import { Track } from './track.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Favs } from '../favs/favs.entity';
import { ArtistsFavs } from '../favs/artists-to-favs.entity';
import { AlbumsFavs } from '../favs/albums-to-favs.entity';
import { TracksFavs } from '../favs/tracks-to-favs.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';


@Module({
  providers: [TrackService, FavsService, ArtistService, AlbumService],
  controllers: [TrackController],
  imports: [TypeOrmModule.forFeature([Track, Artist, Album, ArtistsFavs, AlbumsFavs, TracksFavs]),]
})
export class TrackModule { }
