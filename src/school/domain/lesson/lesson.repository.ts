import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '@/school/domain/lesson/lesson';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {}
