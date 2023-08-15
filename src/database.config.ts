import { Album } from './album/album.entity';
import { Artist } from './artist/artist.entity';
import { AlbumsFavs } from './favs/albums-to-favs.entity';
import { ArtistsFavs } from './favs/artists-to-favs.entity';
import { TracksFavs } from './favs/tracks-to-favs.entity';
import { Track } from './track/track.entity';
import { User } from './user/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const databaseConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRESS_PORT),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Track, Album, ArtistsFavs, AlbumsFavs, TracksFavs],
  synchronize: true,
  logging: false,
  migrations: ['dist/migrations/*.js'],
});
