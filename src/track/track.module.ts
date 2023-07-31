import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsService } from '../favs/favs.service';

@Module({
  providers: [TrackService, FavsService],
  controllers: [TrackController],
})
export class TrackModule {}
