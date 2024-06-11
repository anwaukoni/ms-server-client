import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsNumber()
  @IsNotEmpty()
  sortOrder: number;
}

export class CreateTasksDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  message?: string;

  @IsNumber()
  @IsNotEmpty()
  sortOrder: number;
}
