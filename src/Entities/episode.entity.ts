import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Character } from './character.entity';
import { Comment } from './comment.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  release_date: Date;

  @Column()
  episode_code: string;

  @ManyToMany(() => Character, (character) => character.episodes)
  characters: Character[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  episode_comments: Comment[];

  @Column({ type: 'timestamp' })
  created_at: Date;
}
