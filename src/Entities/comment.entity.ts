import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Episode } from './episode.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  comment: string;

  @Column()
  ip_address_location: string;

  @ManyToOne(() => Episode, episode => episode.episode_comments)
  episode: Episode;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
