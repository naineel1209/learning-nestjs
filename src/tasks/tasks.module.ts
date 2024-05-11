import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksService]
})
export class TasksModule { }
