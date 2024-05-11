import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class GetTasksFilterDTO {

  @IsEnum(TaskStatus, { message: 'Status must be either OPEN, IN_PROGRESS, or DONE' })
  status?: TaskStatus;

  @IsNotEmpty()
  search?: string;
}