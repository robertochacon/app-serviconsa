import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarinto',
  templateUrl: './navbarinto.component.html',
  styleUrls: ['./navbarinto.component.css']
})
export class NavbarintoComponent implements OnInit {

  nameUser = 'roberto';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const session = localStorage.getItem('token');
    if(!session || session === undefined){
      this.router.navigate(['']);
    }
  }

  salir(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
