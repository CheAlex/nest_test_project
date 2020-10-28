import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Content } from '@/school/domain/lesson/lesson/content';
import { Video } from '@/school/domain/video/video';
import { Keynote } from '@/school/domain/keynote/keynote';

@Entity('school_lessons')
export class Lesson {
  @PrimaryColumn({length: 36})
  hash: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  order: number;

  @Column(() => Content)
  content: Content = new Content([], []); // без этого присвоения, при обновлении typeorm отваливается

  @Column({ type: 'timestamp' })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  modified?: Date | null;

  constructor(hash: string, title: string, description: string, order: number, content: Content) {
    this.hash        = hash;
    this.title       = title;
    this.description = description;
    this.order       = order;
    this.created     = new Date();
    this.content     = content;
  }

  update(title: string, description: string, order: number, content: Content) {
    this.title       = title;
    this.description = description;
    this.order       = order;
    this.modified    = new Date();
    this.content     = content;
  }

  addContentVideo(video: Video) {
    this.content.videos.push(video);
    this.modified = new Date();
  }

  removeContentVideo(videoToRemove: Video) {
    this.content.videos = this.content.videos.filter(video => video.hash !== videoToRemove.hash)
    this.modified = new Date();
  }

  addContentKeynote(keynote: Keynote) {
    this.content.keynotes.push(keynote);
    this.modified = new Date();
  }

  removeContentKeynote(keynoteToRemove: Keynote) {
    this.content.keynotes = this.content.keynotes.filter(keynote => keynote.hash !== keynoteToRemove.hash)
    this.modified = new Date();
  }
}
