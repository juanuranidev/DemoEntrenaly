export type WorkoutPlanModel = {
  file: any;
  id: string;
  name: string;
  type: string;
  hasFile: boolean;
  days: WorkoutDay[];
};

interface WorkoutDay {
  day: {
    name: string;
    muscles: MuscleGroup[];
  };
}

interface MuscleGroup {
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  isSuperSet: boolean;
}
