import { IsNotEmpty } from "class-validator";

export class CreateTaskDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}