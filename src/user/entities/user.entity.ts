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

@Entity('Users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

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
