import { Component } from '@angular/core';
import { StudentComponent } from '../../components/student_components/student/student.component';
import { OfficialComponent } from '../../components/official_components/official/official.component';
import { ModifyOfficialComponent } from 'src/app/components/official_components/modify-official/modify-official.component';
import { RemoveOfficialComponent } from 'src/app/components/official_components/remove-official/remove-official.component';
import { IncludeOfficialComponent } from 'src/app/components/official_components/include-official/include-official.component';
import { IncludeStudentComponent } from '../../components/student_components/include-student/include-student.component';
import { FilterOfficialComponent } from 'src/app/components/official_components/filter-official/filter-official.component';
import { ModifyStudentComponent } from 'src/app/components/student_components/modify-student/modify-student.component';
import { RemoveStudentComponent } from 'src/app/components/student_components/remove-student/remove-student.component';

@Component({
  selector: 'app-grant',
  standalone: true,
  imports: [
    OfficialComponent,
    ModifyOfficialComponent,
    RemoveOfficialComponent,
    IncludeOfficialComponent,

    FilterOfficialComponent,
    StudentComponent,
    ModifyStudentComponent,
    RemoveStudentComponent,
    IncludeStudentComponent,
  ],
  templateUrl: './grant.component.html',
  styleUrl: './grant.component.css',
})
export class GrantComponent {}