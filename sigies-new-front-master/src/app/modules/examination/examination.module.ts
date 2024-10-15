import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationRoutingModule } from './examination-routing.module';
import { ExaminationComponent } from './test/examination.component';

@NgModule({
  declarations: [ExaminationComponent],
  imports: [CommonModule, ExaminationRoutingModule],
})
export class ExaminationModule {}
