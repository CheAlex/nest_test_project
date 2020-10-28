import { Video } from '@/school/domain/video/video';
import { Keynote } from '@/school/domain/keynote/keynote';
import { JoinTable, ManyToMany } from 'typeorm';

export class Content {
  @ManyToMany(() => Video)
  @JoinTable({ name: 'school_lesson_content_videos' })
  videos: Video[];

  @ManyToMany(() => Keynote)
  @JoinTable({ name: 'school_lesson_content_keynotes' })
  keynotes: Keynote[];

  constructor(videos: Video[], keynotes: Keynote[]) {
    this.videos   = videos;
    this.keynotes = keynotes;
  }

  findVideo(videoHash: string) {
    return this.videos.find(video => video.hash === videoHash);
  }

  findKeynote(keynoteHash: string) {
    return this.keynotes.find(keynote => keynote.hash === keynoteHash);
  }
}
