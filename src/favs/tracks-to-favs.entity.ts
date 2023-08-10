import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Track } from "../track/track.entity";

@Entity('tracks_to_favs')
export class TracksFavs {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Track, track => track.id)
  @JoinColumn({ name: 'trackId' })
  track: Track

  @Column({ type: 'varchar', nullable: true })
  trackId: string | null
}
