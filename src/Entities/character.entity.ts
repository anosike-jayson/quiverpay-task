import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Location } from './location.entity';
import { Episode } from './episode.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  status: string;

  @Column()
  state_of_origin: string;

  @Column()
  gender: string;

  @ManyToOne(() => Location, location => location.characters)
  location: Location;

  @ManyToMany(() => Episode, episode => episode.characters)
  @JoinTable()
  episodes: Episode[];

  @Column({ type: 'timestamp' })
  created_at: Date;
}
