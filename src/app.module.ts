import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig.options),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
