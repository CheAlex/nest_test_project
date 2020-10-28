import { EntityRepository, Repository } from 'typeorm';
import { User } from '@/identity/domain/model/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
