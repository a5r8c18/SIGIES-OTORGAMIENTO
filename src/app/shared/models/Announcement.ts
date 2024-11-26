import { Student } from './Student';

export class Announcement {
  id!: string;
  name!: string;
  description!: string;
  type!: string;
  official_aprove!: boolean;
  students!: Student[];
}
