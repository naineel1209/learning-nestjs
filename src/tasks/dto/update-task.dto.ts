import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class UpdateTaskDTO {

  @IsNotEmpty()
  title?: string;

  @IsNotEmpty()
  description?: string;

  @IsEnum(TaskStatus, { message: 'Status must be either OPEN, IN_PROGRESS, or DONE' })
  status?: TaskStatus;
}