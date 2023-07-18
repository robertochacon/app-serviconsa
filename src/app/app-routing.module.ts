import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { BillsComponent } from './components/bills/bills.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'equipment_rental', component: EquipmentsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'users', component: UsersComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
