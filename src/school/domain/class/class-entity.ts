import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Duration } from '@/school/domain/class/class-entity/duration';
import { User } from '@/identity/domain/model/user';
import { Lesson } from '@/school/domain/lesson/lesson';

@Entity('school_classes')
export class ClassEntity {
  @PrimaryColumn({length: 36})
  hash: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  order: number;

  @Column(() => Duration)
  duration: Duration;

  @Column({ type: 'timestamp' })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  modified?: Date | null;

  @ManyToMany(() => User)
  @JoinTable({ name: 'school_class_users' })
  users: User[];

  @ManyToMany(() => Lesson)
  @JoinTable({ name: 'school_class_lessons' })
  lessons: Lesson[];

  constructor(hash: string, title: string, description: string, order: number, duration: Duration) {
    this.hash        = hash;
    this.title       = title;
    this.description = description;
    this.order       = order;
    this.duration    = duration;
    this.created     = new Date();
  }

  update(title: string, description: string, order: number, duration: Duration) {
    this.title       = title;
    this.description = description;
    this.order       = order;
    this.duration    = duration;
    this.modified    = new Date();
  }

  addLesson(lesson: Lesson) {
    this.lessons.push(lesson);
    this.modified = new Date();
  }

  findLesson(lessonHash: string) {
    return this.lessons.find(lesson => lesson.hash === lessonHash);
  }

  removeLesson(lessonToRemove: Lesson) {
    this.lessons = this.lessons.filter(lesson => lesson.hash !== lessonToRemove.hash)
    this.modified = new Date();
  }

  enrollUser(user: User) {
    this.users.push(user);
    this.modified = new Date();
  }

  findUser(userHash: string) {
    return this.users.find(user => user.hash === userHash);
  }

  expelUser(userToExpel: User) {
    this.users = this.users.filter(user => user.hash !== userToExpel.hash)
    this.modified = new Date();
  }
}
