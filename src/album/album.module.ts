import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Module({
  providers: [AlbumService, TrackService, FavsService],
  controllers: [AlbumController],
})
export class AlbumModule {}
