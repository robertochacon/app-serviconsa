import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  role = 'admin';
  password = '';
  allUsers: any[] = [];
  listDoctors: any[] = [];
  listAdmins: any[] = [];
  listSeller: any[] = [];
  listEntities: any[] = [];

  constructor(private _users: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.loading = true;

    this._users.getAllUsers().subscribe((response)=>{

      this.allUsers  = response.data;
      this.listAdmins = this.allUsers .filter(item => item.role === 'admin');
      this.listSeller = this.allUsers .filter(item => item.role === 'seller');

      setTimeout(function(){
        $('#listDoctors').DataTable();
        $('#listAdmins').DataTable();
        $('#listSeller').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listSeller').DataTable();
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
    datos.append("role",this.role);
    datos.append("password",this.password);
    // datos.append("file",this.file);

    this._users.setUsers(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllUsers();
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

      this._users.deleteUsers(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllUsers();
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
