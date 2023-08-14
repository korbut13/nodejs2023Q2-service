import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../artist/artist.entity";

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'integer' })
  year: number

  @ManyToOne(() => Artist, artist => artist.id)
  @JoinColumn({ name: 'artistId' })
  artist: Artist

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;
}
