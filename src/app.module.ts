import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

import { AlbumController } from './album/album.controller';
import { TrackController } from './track/track.controller';


@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController, AlbumController, TrackController],
  providers: [AppService],
})
export class AppModule { }
