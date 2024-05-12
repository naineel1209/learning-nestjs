import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}