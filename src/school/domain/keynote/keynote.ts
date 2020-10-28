import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('school_keynotes')
export class Keynote {
  @PrimaryColumn({length: 36})
  hash: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  uri: string;
}
