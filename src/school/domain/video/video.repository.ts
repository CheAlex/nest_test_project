import { EntityRepository, Repository } from 'typeorm';
import { Video } from '@/school/domain/video/video';

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {}
