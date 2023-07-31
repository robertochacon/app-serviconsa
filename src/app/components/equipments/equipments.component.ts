import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EquipmentsService } from 'src/app/services/equipments.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  updateData:any = null;
  price = '';
  name = '';
  provider = '';
  phone = '';
  listEquipmentRental: any[] = [];

  constructor(private _equipment_rental: EquipmentsService) { }

  ngOnInit(): void {
    this.getAllEquipmentRental();
  }

  getAllEquipmentRental(){
    this.loading = true;

    this._equipment_rental.getAllEquipmentRental().subscribe((response)=>{

      this.listEquipmentRental  = response.data;

      setTimeout(function(){
        $('#listEquipmentRental').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listEquipmentRental').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.price = '';
    this.provider = '';
    this.phone = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("provider",this.provider);
    datos.append("price",this.price);
    datos.append("phone",this.phone);
    // datos.append("file",this.file);

    this._equipment_rental.setEquipmentRental(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEquipmentRental();
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
    this.provider = this.updateData?.provider;
    this.price = this.updateData?.price;
    this.phone = this.updateData?.phone;
  }

  update(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("provider",this.provider);
    datos.append("price",this.price);
    datos.append("phone",this.phone);

    this._equipment_rental.updateEquipmentRental(this.updateData?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEquipmentRental();
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
      title: 'Deseas eliminar este equipo rentado?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._equipment_rental.deleteEquipmentRental(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllEquipmentRental();
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
