import { Injectable } from '@nestjs/common';
import {
  DogeGymState,
  Workout,
  WorkoutPlan,
  WorkoutRepeat,
} from '../../../ts/interfaces';

import { stripBom } from '../../../utils';

@Injectable()
export class GymStateParserService {
  private readonly cellSeparator: string = ',';
  private readonly rowSeparator: string = '\n';
  private readonly dataSeparator: string = '_______________';
  private readonly rowDataSeparator: string[] = [
    this.dataSeparator,
    this.dataSeparator,
    this.dataSeparator,
    this.dataSeparator,
    this.dataSeparator,
  ];

  private readonly CSVTitleRows = {
    main: ['Планы тренировок'],

    mainWorkouts: ['Упражненя'],

    workoutPlan: ['id', 'Название', 'Описание'],
    workoutForPlan: ['id', 'Упражнение в плане', 'Описание'],
    workouts: ['id', 'Упражнение', 'Описание'],
    workoutRepeatsMain: ['Подходы'],
    workoutRepeats: ['Вес', 'Количество повторов'],
  };

  private CSVParseSteps = {
    workoutPlan: 'workoutPlan',
    workoutForPlan: 'workoutForPlan',
    workouts: 'workouts',
    workoutRepeats: 'workoutRepeats',
  };

  public convertGymStateToCSV(state: DogeGymState): string {
    const csvStringRows: string[] = [];
    const csvRows = [];

    csvRows.push(this.CSVTitleRows.main);

    state.workoutPlans.forEach((workoutPlan: WorkoutPlan) => {
      csvRows.push(this.CSVTitleRows.workoutPlan);

      csvRows.push([
        workoutPlan.id,
        workoutPlan.title,
        workoutPlan.description,
      ]);

      csvRows.push(this.CSVTitleRows.workoutForPlan);

      workoutPlan.workouts.forEach((workoutId: string) => {
        const workout = state.workouts.find(
          (e) => e.id === workoutId,
        ) as Workout;
        csvRows.push([workout.id, workout.title, workout.description]);
      });
      csvRows.push(this.rowDataSeparator);
    });

    csvRows.push(this.CSVTitleRows.mainWorkouts);

    state.workouts.forEach((workout: Workout) => {
      csvRows.push(this.CSVTitleRows.workouts);

      csvRows.push([workout.id, workout.title, workout.description]);

      csvRows.push(this.CSVTitleRows.workoutRepeatsMain);
      csvRows.push(this.CSVTitleRows.workoutRepeats);

      workout.repeats.forEach((workoutRepeat: WorkoutRepeat) => {
        csvRows.push([workoutRepeat.weight, workoutRepeat.repeats]);
      });

      csvRows.push(this.rowDataSeparator);
    });

    csvRows.forEach((row: string[]) => {
      csvStringRows.push(row.join(this.cellSeparator));
    });

    return csvStringRows.join(this.rowSeparator);
  }

  public convertCSVToState(stateCSV: string) {
    const state: DogeGymState = {
      workoutPlans: [],
      workouts: [],
    };

    const csvRows = stripBom(stateCSV).split(this.rowSeparator);

    const rowSeparatorString = this.rowDataSeparator.join(this.cellSeparator);

    const skippedRows = [rowSeparatorString, ''];

    for (const titleRowKey in this.CSVTitleRows) {
      const rowString = this.CSVTitleRows[titleRowKey].join(this.cellSeparator);
      skippedRows.push(rowString);
    }

    let currentStep = null;
    let currentWorkoutPlan: WorkoutPlan = null;
    let currentWorkout: Workout = null;

    csvRows.forEach((row: string) => {
      if (row === this.CSVTitleRows.workoutPlan.join(this.cellSeparator)) {
        currentStep = this.CSVParseSteps.workoutPlan;
      }

      if (row === this.CSVTitleRows.workoutForPlan.join(this.cellSeparator)) {
        currentStep = this.CSVParseSteps.workoutForPlan;
      }

      if (row === this.CSVTitleRows.workouts.join(this.cellSeparator)) {
        currentStep = this.CSVParseSteps.workouts;
      }

      if (row === this.CSVTitleRows.workoutRepeats.join(this.cellSeparator)) {
        currentStep = this.CSVParseSteps.workoutRepeats;
      }

      if (skippedRows.includes(row)) {
        return;
      }

      const rowData = row.split(this.cellSeparator);

      if (currentStep === this.CSVParseSteps.workoutPlan) {
        currentWorkoutPlan = {
          description: rowData[2],
          id: rowData[0],
          title: rowData[1],
          workouts: [],
        };
        state.workoutPlans.push(currentWorkoutPlan);
      }

      if (currentStep === this.CSVParseSteps.workoutForPlan) {
        currentWorkoutPlan.workouts.push(rowData[0]);
      }

      if (currentStep === this.CSVParseSteps.workouts) {
        currentWorkout = {
          description: rowData[2],
          id: rowData[0],
          repeats: [],
          title: rowData[1],
        };

        state.workouts.push(currentWorkout);
      }

      if (currentStep === this.CSVParseSteps.workoutRepeats) {
        currentWorkout.repeats.push({
          weight: parseFloat(rowData[0]),
          repeats: parseFloat(rowData[1]),
        });
      }
    });

    return JSON.stringify(state);
  }
}
