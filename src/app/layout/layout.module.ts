import { NgModule } from '@angular/core';
import { LayoutAppComponent } from './layout-app/layout-app.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [
    LayoutAppComponent
  ],
  imports: [
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
