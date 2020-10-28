import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '@/identity/domain/model/user/role';
import { Sex } from '@/identity/domain/model/user/sex';

@Entity('identity_users')
export class User {
  @PrimaryColumn({length: 36})
  hash: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: false
  })
  sex: Sex;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false
  })
  role: Role;
}
