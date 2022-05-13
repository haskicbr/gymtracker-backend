interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  workouts: string[];
}

interface WorkoutGroup {
  name: string;
}

interface WorkoutRepeat {
  weight: number;
  repeats: number;
  restDuration?: number;
  repeatDuration?: number;
}

interface Workout {
  id: string | null;
  title: string;
  description: string;
  repeats: WorkoutRepeat[];
  isRepeated?: boolean;
  additionalParams?: string[];
}

interface Settings {
  weightStep: number;
  language: string;
}

interface DogeGymState {
  workoutPlanStarted?: boolean;
  workoutPlanActiveId?: string;
  workoutPlans: WorkoutPlan[];
  workouts: Workout[];
  settings?: Settings;
}

export {
  WorkoutPlan,
  Workout,
  WorkoutRepeat,
  DogeGymState,
  WorkoutGroup,
  Settings,
};
