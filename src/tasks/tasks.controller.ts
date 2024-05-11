import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDTO } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // getAllTasks(@Query() getTasksFilterDto: GetTasksFilterDTO) {
  //   return this.tasksService.getAllTasks(getTasksFilterDto);
  // }

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

  // @Patch(':id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDTO
  // ) {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }


  // @Delete(':id')
  // deleteTask(@Param('id') id: string) {
  //   return this.tasksService.deleteTask(id);
  // }
}
