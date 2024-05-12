import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  async getAllTasks(@Query() getTasksFilterDto: GetTasksFilterDTO) {
    return await this.tasksService.getAllTasks(getTasksFilterDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDTO
  ) {
    // const { title, description } = body;
    // return this.tasksService.createTask(title, description);
    return await this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }


  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }
}
