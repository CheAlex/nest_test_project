import { EntityRepository, Repository } from 'typeorm';
import { ClassEntity } from '@/school/domain/class/class-entity';

@EntityRepository(ClassEntity)
export class ClassEntityRepository extends Repository<ClassEntity> {}
