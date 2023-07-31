import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';


@Module({
  providers: [FavsService, TrackService, AlbumService, ArtistService],
  controllers: [FavsController]
})
export class FavsModule {

}
