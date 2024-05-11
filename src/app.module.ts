import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: 'public',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'task-mgmt-nest',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule { }
