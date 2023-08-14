import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import { ArtistsFavs } from './artists-to-favs.entity';
import { AlbumsFavs } from './albums-to-favs.entity';
import { TracksFavs } from './tracks-to-favs.entity';
import { ArtistService } from '../artist/artist.service';

@Module({
  providers: [FavsService, TrackService, AlbumService, ArtistService],
  controllers: [FavsController],
  imports: [TypeOrmModule.forFeature([ArtistsFavs, AlbumsFavs, TracksFavs, Artist, Track, Album])]
})
export class FavsModule { }
