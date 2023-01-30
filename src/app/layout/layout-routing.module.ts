import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppAppModule } from '../shopp-app/shopp-app.module';
import { LayoutAppComponent } from './layout-app/layout-app.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutAppComponent,
    children:[
      {path:'', loadChildren:()=>ShoppAppModule}
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
