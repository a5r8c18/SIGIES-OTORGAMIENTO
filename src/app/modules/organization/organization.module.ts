import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './test/organization.component';

@NgModule({
  declarations: [OrganizationComponent],
  imports: [CommonModule, OrganizationRoutingModule],
})
export class OrganizationModule {}
