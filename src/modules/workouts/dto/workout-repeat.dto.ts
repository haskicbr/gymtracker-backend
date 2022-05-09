import { WorkoutRepeat } from "../../../ts/interfaces";
import { IsNumber, IsOptional } from "class-validator";

export default class WorkoutRepeatDto implements WorkoutRepeat {
  @IsOptional()
  @IsNumber()
  repeatDuration: number;
  @IsOptional()
  @IsNumber()
  restDuration: number;
  @IsNumber()
  weight: number;
  @IsNumber()
  repeats: number;
}
