import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { TaskStatus } from './tasks-status.enum';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task>{

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {
    super(tasksRepository.target, tasksRepository.manager, tasksRepository.queryRunner)
  }

  async getAllTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDto;

    const tasksQuery = this.tasksRepository.createQueryBuilder('task')

    if (search) {
      tasksQuery.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)', { search: `%${search.toLowerCase()}%` })
    }

    if (status) {
      tasksQuery.andWhere('task.status = :status', { status })
    }

    tasksQuery.andWhere('task.deletedAt IS NULL')

    const tasks = await tasksQuery.getMany();

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id: id,
        deletedAt: null
      }
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN, // default status
    })

    await this.tasksRepository.save(task)

    return task;
  }

  async deleteTask(id: string) {
    const result = await this.tasksRepository.softDelete(id);

    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return {
      message: `Task with ID "${id}" has been deleted`
    };
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDTO) {
    const task = await this.getTaskById(id);

    if (task) {
      const { title, description, status } = updateTaskDto;

      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;

      await this.tasksRepository.save(task);
    }

    return task;
  }
}