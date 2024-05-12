import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksService, TasksRepository]
})
export class TasksModule { }
