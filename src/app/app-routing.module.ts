import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
