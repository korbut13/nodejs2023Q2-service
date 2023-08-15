import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Entity('favs')
export class Favs {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Artist)
  @JoinTable({
    name: 'artists_to_favs',
  })
  // @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album)
  @JoinTable({
    name: 'albums_to_favs',
  })
  albums: Album[];

  @ManyToMany(() => Track)
  @JoinTable({
    name: 'tracks_to_favs',
  })
  tracks: Track[];
}
