import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';


import { TrackController } from './track/track.controller';


@Module({
  imports: [UserModule, ArtistModule, AlbumModule],
  controllers: [AppController, TrackController],
  providers: [AppService],
})
export class AppModule { }
