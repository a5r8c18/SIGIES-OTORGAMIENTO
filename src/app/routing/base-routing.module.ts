import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from '../layouts/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'assignment',
        loadChildren: () =>
          import('../modules/assignment/assignment-routing.module').then(
            (m) => m.AssignmentRoutingModule,
          ),
      },
      {
        path: 'examination',
        loadChildren: () =>
          import('../modules/examination/examination-routing.module').then(
            (m) => m.ExaminationRoutingModule,
          ),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('../modules/general/general-routing.module').then(
            (m) => m.GeneralRoutingModule,
          ),
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('../modules/organization/organization-routing.module').then(
            (m) => m.OrganizationRoutingModule,
          ),
      },
      // {
      //   path: 'dev/docs',
      //   loadChildren: () => import('../../modules/docs/docs.module').then((m) => m.DocsModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
