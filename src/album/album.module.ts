import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/track.entity';
import { Album } from './album.entity';

@Module({
  providers: [AlbumService, TrackService, FavsService],
  controllers: [AlbumController],
  imports: [TypeOrmModule.forFeature([Album, Track]),]
})
export class AlbumModule { }
