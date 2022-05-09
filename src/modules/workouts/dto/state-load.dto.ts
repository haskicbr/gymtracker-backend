import {
  IsArray,
  IsOptional,
  ValidateNested,

} from 'class-validator';
import { Type } from 'class-transformer';
import { SettingsDto, WorkoutPlanDto, WorkoutDto } from "./";
import { DogeGymState } from "../../../ts/interfaces";

export default class StateLoadDto implements DogeGymState {
  @IsOptional()
  settings: SettingsDto;
  @IsOptional()
  workoutPlanActiveId: string;
  @IsOptional()
  workoutPlanStarted: boolean;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutPlanDto)
  workoutPlans: WorkoutPlanDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutDto)
  workouts: WorkoutDto[];
}
