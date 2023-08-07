import { Column, Entity, PrimaryGeneratedColumn, VersionColumn, } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: 'login', type: 'varchar' })
  login: string

  @Column({ name: 'password', type: 'varchar' })
  password: string

  @VersionColumn()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

}
