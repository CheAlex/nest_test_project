import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('school_videos')
export class Video {
  @PrimaryColumn({length: 36})
  hash: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  uri: string;
}
