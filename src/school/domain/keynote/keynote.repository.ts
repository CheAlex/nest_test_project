import { EntityRepository, Repository } from 'typeorm';
import { Keynote } from '@/school/domain/keynote/keynote';

@EntityRepository(Keynote)
export class KeynoteRepository extends Repository<Keynote> {}
