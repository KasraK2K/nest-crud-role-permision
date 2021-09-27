import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserPermissionsEnum } from 'src/auth/enums/permission.enum';

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
  async hashPassword() {
    this.password = await this.hash(this.password);
  }

  async hash(argument: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(argument, salt);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
