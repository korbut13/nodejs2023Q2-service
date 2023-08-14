import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../album/album.entity';

@Entity('albums_to_favs')
export class AlbumsFavs {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Album, (album) => album.id)
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;
}
