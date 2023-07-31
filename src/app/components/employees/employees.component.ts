import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  address = '';
  name = '';
  phone = '';
  details:any;
  updateData:any;
  description_expense='';
  commissions:any=0;
  diet:any=0;
  fuel:any=0;
  total_expense='';
  type_expense='commissions';
  listEmployees: any[] = [];

  constructor(private _employees: EmployeesService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.loading = true;

    this._employees.getAllEmployees().subscribe((response)=>{

      this.listEmployees  = response.data;

      setTimeout(function(){
        $('#listEmployees').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listEmployees').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.address = '';
    this.phone = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("address",this.address);
    datos.append("phone",this.phone);

    this._employees.setEmployees(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEmployees();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }

  save_expense(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("id_employee",this.details?.id);
    datos.append("description",this.description_expense);
    datos.append("total",this.total_expense);
    datos.append("type",this.type_expense);

    this._employees.setEmployeesExpense(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEmployees();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }

  setUpdate(){
    this.name = this.updateData?.name;
    this.address = this.updateData?.address;
    this.phone = this.updateData?.phone;
  }

  update(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("address",this.address);
    datos.append("phone",this.phone);

    this._employees.updateEmployees(this.updateData?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEmployees();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }
  
  delete(id: any): void {
    Swal.fire({
      title: 'Deseas eliminar este servicio?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._employees.deleteEmployees(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllEmployees();
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Problemas tecnicos!',
          text: 'No se pudo completar el registro, favor intente nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      })
    
      }
    })

  }

  calculaTotal(){
    this.details?.items.map((item:any) => {
      if (item.type==='commissions') {
        this.commissions = (this.commissions+item.total);
      }else if (item.type==='diet') {
        this.diet = (this.diet+item.total);
      }else if (item.type==='fuel') {
        this.fuel = (this.fuel+item.total);
      }
    })
  }


}
