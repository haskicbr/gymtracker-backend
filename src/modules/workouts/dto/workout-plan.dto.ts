import { IsArray, IsString } from 'class-validator';
import { WorkoutPlan } from '../../../ts/interfaces';

export default class WorkoutPlanDto implements WorkoutPlan {
  @IsString()
  description: string;
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsArray()
  @IsString({ each: true })
  workouts: string[];
}
