import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserPermissionsEnum } from 'src/auth/enums/permission.enum';
import * as config from 'config';

const userConfig = config.get('user');

@Entity('Users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    array: true,
    enum: UserPermissionsEnum,
    default: [UserPermissionsEnum.FIND, UserPermissionsEnum.FIND_ONE],
  })
  permissions: UserPermissionsEnum;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  // ────────────────────────────────────────────────────────────────────
  //   :::::: F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password.length <= userConfig.password.max)
      this.password = this.hash(this.password);
  }

  hash(argument: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(argument, salt);
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
