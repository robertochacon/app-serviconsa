import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SuppliersService } from 'src/app/services/suppliers.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  direction = '';
  phone = '';
  allSuppliers: any[] = [];
  listSuppliers: any[] = [];

  constructor(private _suppliers: SuppliersService) { }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers(){
    this.loading = true;

    this._suppliers.getAllSuppliers().subscribe((response)=>{

      this.allSuppliers  = response.data;
      this.listSuppliers  = response.data;
      // this.listSuppliers = this.allSuppliers.filter(item => item.type === 'diary');
      // this.listAdmins = this.allSuppliers .filter(item => item.role === 'admin');

      setTimeout(function(){
        $('#listSuppliers').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listSuppliers').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.direction = '';
    this.phone = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("direction",this.direction);
    datos.append("phone",this.phone);
    // datos.append("file",this.file);

    this._suppliers.setSuppliers(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllSuppliers();
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
      title: 'Deseas eliminar este suplidor?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._suppliers.deleteSuppliers(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllSuppliers();
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
