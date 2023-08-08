import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VersionColumn, } from "typeorm";
import { Artist } from "../artist/artist.entity";
import { Album } from "../album/album.entity";

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: 'varchar' })
  name: string

  @ManyToOne(() => Artist, artist => artist.id)
  @JoinColumn({ name: 'artistId' })
  artist: Artist

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, album => album.id)
  @JoinColumn({ name: 'albumId' })
  album: Album

  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @Column({ type: 'integer' })
  duration: number
}
