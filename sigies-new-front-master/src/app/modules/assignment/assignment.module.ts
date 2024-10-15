import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssignmentComponent } from './test/assignment.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AssignmentComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class AssignmentModule {}
