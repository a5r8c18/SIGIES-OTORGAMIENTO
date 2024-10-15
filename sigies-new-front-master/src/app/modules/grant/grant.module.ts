import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrantRoutingModule } from './grant-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GrantRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class GrantModule {}
