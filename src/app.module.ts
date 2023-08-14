// import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { ArtistModule } from './artist/artist.module';
// import { AlbumModule } from './album/album.module';
// import { TrackModule } from './track/track.module';
// import { FavsModule } from './favs/favs.module';

// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/user.entity';
// import { Artist } from './artist/artist.entity';
// import { Track } from './track/track.entity';
// import { Album } from './album/album.entity';
// import { ArtistsFavs } from './favs/artists-to-favs.entity';
// import { AlbumsFavs } from './favs/albums-to-favs.entity';
// import { TracksFavs } from './favs/tracks-to-favs.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: '.env'
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.POSTGRES_HOST,
//       port: Number(process.env.POSTGRESS_PORT),
//       username: process.env.POSTGRES_USER,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//       entities: [User, Artist, Track, Album, ArtistsFavs, AlbumsFavs, TracksFavs],
//       synchronize: true,
//     }),
//     UserModule, ArtistModule, AlbumModule, TrackModule, FavsModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule { }


import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig.options),
    UserModule, ArtistModule, AlbumModule, TrackModule, FavsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
