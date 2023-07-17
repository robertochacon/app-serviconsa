import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { BillsComponent } from './components/bills/bills.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
