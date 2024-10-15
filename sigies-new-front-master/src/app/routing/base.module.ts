import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { FooterComponent } from '../layouts/base/footer/footer.component';
import { BaseComponent } from '../layouts/base/base.component';
import { CoreModule } from '../core/core.module';
import { HeaderComponent } from '../layouts/base/header/header.component';
import { MenuLeftComponent } from '../layouts/base/menu-left/menu-left.component';
import { IndexViewComponent } from 'src/app/layouts/index-view/index-view.component';
import { LoginComponent } from 'src/app/layouts/login/login.component';
import { LogRecoveryComponent } from 'src/app/layouts/recovery/log-recovery.component';
import { BreadcrumbsComponent } from '../layouts/base/header/breadcrumbs/breadcrumbs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    MenuLeftComponent,
    IndexViewComponent,
    LoginComponent,
    LogRecoveryComponent,
    BreadcrumbsComponent,
  ],
  imports: [CommonModule, BaseRoutingModule, CoreModule],
  providers: [],
  exports: [
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    MenuLeftComponent,
    IndexViewComponent,
    LoginComponent,
    LogRecoveryComponent,
    BreadcrumbsComponent,
    HttpClientModule,
  ],
})
export class BaseModule {}
