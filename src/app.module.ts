import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger-middleware/logger.middleware';

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
    }),
    AuthModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
