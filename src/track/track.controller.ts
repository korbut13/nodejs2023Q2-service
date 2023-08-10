import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { IdDto } from '../utils/id.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
  ) { }
  @Get()
  async getAll() {
    return await this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: IdDto) {
    try {
      return await this.trackService.getById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The album with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  create(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.trackService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The track with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Body(ValidationPipe) updateTrackDto: CreateTrackDto,
    @Param(ValidationPipe) { id }: IdDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The track with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
