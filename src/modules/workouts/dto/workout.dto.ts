import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { WorkoutRepeatDto } from "./index";
import { Workout } from "../../../ts/interfaces";

export default class WorkoutDto implements Workout {
  @IsString()
  id: string;
  additionalParams: string[];
  description: string;
  isRepeated: boolean;
  @ValidateNested({ each: true })
  @Type(() => WorkoutRepeatDto)
  repeats: WorkoutRepeatDto[];
  @IsString()
  title: string;
}
