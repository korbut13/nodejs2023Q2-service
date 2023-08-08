import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { Artist } from './artist.entity';

@Module({
  providers: [ArtistService, TrackService, AlbumService, FavsService],
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([Artist]),]
})
export class ArtistModule { }
