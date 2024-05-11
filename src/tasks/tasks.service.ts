import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository
  ) { }

  // getAllTasks(getTasksFilterDto: GetTasksFilterDTO) {
  //   if (Object.keys(getTasksFilterDto).length > 0) {
  //     const { status, search } = getTasksFilterDto;

  //     let tasks = this.tasks;

  //     if (status) {
  //       tasks = tasks.filter(task => task.status === status);
  //     }

  //     if (search) {
  //       tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //     }

  //     return tasks;
  //   }

  //   return this.tasks;
  // }

  async getTaskById(id: string) {
    const found = await this.tasksRepository.findOne({
      where: { id: id }
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDTO) {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN, // default status
    })

    await this.tasksRepository.save(task)

    return task;
  }

  // updateTask(id: string, updateTaskDto: UpdateTaskDTO) {
  //   const task = this.getTaskById(id);

  //   if (task) {
  //     const { title, description, status } = updateTaskDto;

  //     task.title = title || task.title;
  //     task.description = description || task.description;
  //     task.status = status || task.status;
  //   }

  //   return task;
  // }

  // deleteTask(id: string) {
  //   const task = this.getTaskById(id);

  //   this.tasks = this.tasks.filter(task => task.id !== id);

  //   return task;
  // }
}
