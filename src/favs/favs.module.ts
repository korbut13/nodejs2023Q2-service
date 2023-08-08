import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

@Module({
  providers: [FavsService, TrackService, AlbumService, ArtistService],
  controllers: [FavsController],
  imports: [TypeOrmModule.forFeature([Artist, Track, Album])]
})
export class FavsModule { }
