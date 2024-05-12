import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { TaskStatus } from './tasks-status.enum';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository
  ) { }

  async getAllTasks(getTasksFilterDto: GetTasksFilterDTO) {
    return await this.tasksRepository.getAllTasks(getTasksFilterDto);
  }

  async getTaskById(id: string) {
    return await this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDTO) {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDTO) {
    return await this.tasksRepository.updateTask(id, updateTaskDto);
  }

  async deleteTask(id: string) {
    return await this.tasksRepository.deleteTask(id);
  }
}
