import { Official } from './app/shared/models/Official';
import { Student } from './app/shared/models/Student';

export const sample_official: Official[] = [
  {
    id: '1',
    name: 'Jhon',
    lastname: 'Hurtado Garcia',
    position: 'empresario',
  },
  {
    id: '2',
    name: 'Mario',
    lastname: 'Pon Garcia',
    position: 'sastre',
  },
  {
    id: '3',
    name: 'Nicolas',
    lastname: 'Hurtado Garcia',
    position: 'empresario',
  },
  {
    id: '4',
    name: 'Agusto',
    lastname: 'Pon Garcia',
    position: 'sastre',
  },
];

export const sample_student: Student[] = [
  {
    name: 'Jhon',
    lastname: 'Hurtado Garcia',
    ci_passport: 'empresario',
    awarded_specialty: 'buzo',
    gender: 'masculino',
    address: 'calle libertad #203',
    foreign: true,
    country: 'Bolivia',
    pre_university: 'Saul',
    entrance_exams: ['Matematica'],
    academic_index: 4,
    grade_average: 5.6,
    scholarship_right: true,
    ces: 'PUE',
  },
  {
    name: 'Mario',
    lastname: 'Pon Garcia',
    ci_passport: 'empresario',
    awarded_specialty: 'buzo',
    gender: 'masculino',
    address: 'calle libertad #203',
    foreign: false,
    country: 'Cuba',
    pre_university: 'Saul',
    entrance_exams: ['Matematica'],
    academic_index: 4,
    grade_average: 5.6,
    scholarship_right: false,
    ces: 'PUE',
  },
  {
    name: 'Ana',
    lastname: 'Hurtado Garcia',
    ci_passport: 'empresario',
    awarded_specialty: 'buzo',
    gender: 'femenino',
    address: 'calle libertad #203',
    foreign: true,
    country: 'Bolivia',
    pre_university: 'Saul',
    entrance_exams: ['Matematica'],
    academic_index: 4,
    grade_average: 5.6,
    scholarship_right: true,
    ces: 'PUE',
  },
  {
    name: 'Max',
    lastname: 'Pon Garcia',
    ci_passport: 'empresario',
    awarded_specialty: 'buzo',
    gender: 'masculino',
    address: 'calle libertad #203',
    foreign: false,
    country: 'Cuba',
    pre_university: 'Saul',
    entrance_exams: ['Matematica'],
    academic_index: 4,
    grade_average: 5.6,
    scholarship_right: false,
    ces: 'PUE',
  },
];
