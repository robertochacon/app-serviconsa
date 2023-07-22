import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = false;
  identification = "1234";
  password = "admin";
  loading = false;
  
  constructor(private _authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    this.loading = true;
    this.loginError = false;

    this._authentication.login(this.identification,this.password).subscribe((response)=>{
        
        localStorage.setItem("user_id", response.access_token.user.id);
        localStorage.setItem("name", response.access_token.user.name);
        localStorage.setItem("user", JSON.stringify(response.access_token.user));
        localStorage.setItem("role", response.access_token.user.role);
        localStorage.setItem("token", response.access_token.token);
      
        setTimeout(() => {
          this.loading = false;
          if (response.access_token.user.role == 'seller') {
            this.router.navigate(["/invoice_quote"]);
          }else{
            this.router.navigate(["/dashboard"]);
          }
        }, 2000);

    }, error => {
      this.loading = false;
      this.loginError = true;
    })

  }

}
