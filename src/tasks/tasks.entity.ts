import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Entity('task')
export class Task {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("enum", { enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;
}