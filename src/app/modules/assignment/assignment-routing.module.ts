import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentComponent } from './test/assignment.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent,
  },
  {
    path: 'grant',
    loadChildren: () =>
      import('../grant/grant.module').then((m) => m.GrantModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}
