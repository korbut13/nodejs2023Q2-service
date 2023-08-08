import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsService } from '../favs/favs.service';
import { Track } from './track.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';


@Module({
  providers: [TrackService, FavsService],
  controllers: [TrackController],
  imports: [TypeOrmModule.forFeature([Track, Artist, Album]),]
})
export class TrackModule { }
