import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task>{

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner)
  }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN, // default status
    })

    await this.taskRepository.save(task)

    return task;
  }
}