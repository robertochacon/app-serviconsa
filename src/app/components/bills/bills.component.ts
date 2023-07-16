import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BillsService } from 'src/app/services/bills.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {


  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  role = 'admin';
  entity:any = '1';
  range:any = '';
  specialty:any = '';
  phone:any = '';
  address:any = '';
  allBills: any[] = [];
  listBills: any[] = [];

  constructor(private _bills: BillsService) { }

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills(){
    this.loading = true;

    this._bills.getAllBills().subscribe((response)=>{

      this.allBills  = response.data;
      this.listBills = this.allBills.filter(item => item.type === 'diary');
      // this.listAdmins = this.allBills .filter(item => item.role === 'admin');

      setTimeout(function(){
        $('#listBills').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listBills').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.identification = '';
    this.role = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("identification",this.identification);
    datos.append("range",this.range);
    datos.append("specialty",this.specialty);
    datos.append("phone",this.phone);
    datos.append("address",this.address);
    datos.append("role",this.role);
    // datos.append("file",this.file);

    this._bills.setBills(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllBills();
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
      title: 'Deseas eliminar este usuario?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._bills.deleteBills(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllBills();
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


}
