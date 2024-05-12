import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class GetTasksFilterDTO {

  @IsEnum(TaskStatus, { message: 'Status must be either OPEN, IN_PROGRESS, or DONE' })
  @IsOptional()
  status?: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search?: string;
}