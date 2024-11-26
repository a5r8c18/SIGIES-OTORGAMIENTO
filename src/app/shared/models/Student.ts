export class Student {
  authorization!: string;
  ci_passport!: string;
  name!: string;
  lastname!: string;
  awarded_specialty!: string;
  gender!: string;
  address!: string;
  isforeign!: boolean;
  country!: string;
  pre_university!: string;
  // entrance_exams!: { subject: string; grade: number }[];
  entrance_exams!: string[];
  academic_index!: number;
  grade_average!: number;
  scholarship_right!: boolean;
  ces!: string;
}
