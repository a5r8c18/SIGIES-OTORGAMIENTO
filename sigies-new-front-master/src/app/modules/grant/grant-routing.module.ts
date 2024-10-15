import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrantComponent } from './grant.component';
import { OfficialComponent } from 'src/app/components/official_components/official/official.component';
import { StudentComponent } from 'src/app/components/student_components/student/student.component';
import { IncludeOfficialComponent } from 'src/app/components/official_components/include-official/include-official.component';
import { ShowOfficialComponent } from 'src/app/components/official_components/show-official/show-official.component';
import { ModifyOfficialComponent } from 'src/app/components/official_components/modify-official/modify-official.component';
import { RemoveOfficialComponent } from 'src/app/components/official_components/remove-official/remove-official.component';
import { HttpClientModule } from '@angular/common/http';
import { IncludeStudentComponent } from 'src/app/components/student_components/include-student/include-student.component';
import { ShowStudentComponent } from 'src/app/components/student_components/show-student/show-student.component';
import { ModifyStudentComponent } from 'src/app/components/student_components/modify-student/modify-student.component';
import { RemoveStudentComponent } from 'src/app/components/student_components/remove-student/remove-student.component';
import { DiulStudentComponent } from 'src/app/components/diul_components/diul-student/diul-student.component';
import { IncludeDiulStudentComponent } from 'src/app/components/diul_components/include-diul-student/include-diul-student.component';
import { ShowDiulStudentComponent } from 'src/app/components/diul_components/show-diul-student/show-diul-student.component';
import { ModifyDiulStudentComponent } from 'src/app/components/diul_components/modify-diul-student/modify-diul-student.component';
import { RemoveDiulStudentComponent } from 'src/app/components/diul_components/remove-diul-student/remove-diul-student.component';
import { CipStudentComponent } from 'src/app/components/cip_components/cip-student/cip-student.component';
import { IncludeCipStudentComponent } from 'src/app/components/cip_components/include-cip-student/include-cip-student.component';
import { ShowCipStudentComponent } from 'src/app/components/cip_components/show-cip-student/show-cip-student.component';
import { ModifyCipStudentComponent } from 'src/app/components/cip_components/modify-cip-student/modify-cip-student.component';
import { RemoveCipStudentComponent } from 'src/app/components/cip_components/remove-cip-student/remove-cip-student.component';

const routes: Routes = [
  { path: '', component: GrantComponent },
  { path: 'search/:searchTerm', component: OfficialComponent },
  { path: 'official/:searchTerm', component: OfficialComponent },
  { path: 'official', component: OfficialComponent },
  { path: 'include-official', component: IncludeOfficialComponent },
  { path: 'show-official/:officialId', component: ShowOfficialComponent },
  { path: 'modify-official/:officialId', component: ModifyOfficialComponent },
  { path: 'remove-official/:officialId', component: RemoveOfficialComponent },

  { path: 'student', component: StudentComponent },
  { path: 'include-student', component: IncludeStudentComponent },
  { path: 'show-student/:ci_passport', component: ShowStudentComponent },
  { path: 'modify-student/:ci_passport', component: ModifyStudentComponent },
  { path: 'remove-student/:officialId', component: RemoveStudentComponent },

  { path: 'diul-student', component: DiulStudentComponent },
  { path: 'include-diul-student', component: IncludeDiulStudentComponent },
  {
    path: 'show-diul-student/:ci_passport',
    component: ShowDiulStudentComponent,
  },
  {
    path: 'modify-diul-student/:ci_passport',
    component: ModifyDiulStudentComponent,
  },
  { path: 'remove-diul-student', component: RemoveDiulStudentComponent },

  { path: 'cip-student', component: CipStudentComponent },
  { path: 'include-cip-student', component: IncludeCipStudentComponent },
  {
    path: 'show-cip-student/:ci_passport',
    component: ShowCipStudentComponent,
  },
  {
    path: 'modify-cip-student/:ci_passport',
    component: ModifyCipStudentComponent,
  },
  { path: 'remove-cip-student', component: RemoveCipStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class GrantRoutingModule {}
