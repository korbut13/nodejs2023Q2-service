import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Module({
  providers: [ArtistService, TrackService, AlbumService, FavsService],
  controllers: [ArtistController],
})
export class ArtistModule {}
