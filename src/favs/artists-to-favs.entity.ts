import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';

@Entity('artists_to_favs')
export class ArtistsFavs {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Artist, (artist) => artist.id)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;
}
