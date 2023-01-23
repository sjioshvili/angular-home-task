import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesManagersComponent } from './sales-managers.component';

const routes: Routes = [
  {
    path: '',
    component: SalesManagersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesManagersRoutingModule {}
