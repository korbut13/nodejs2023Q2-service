import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { AuthModule } from './auth/auth.module';
import { LoggerServiceMiddleware } from './logger/logger-service.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilterService } from './logger/exception-filter';

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
  providers: [{ provide: APP_FILTER, useClass: ExceptionFilterService }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerServiceMiddleware).forRoutes('*');
  }
}
