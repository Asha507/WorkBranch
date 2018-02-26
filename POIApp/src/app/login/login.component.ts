import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:any={};
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
  }
  Login(){    
  this.loginService.Authenticate(this.login.userID,this.login.pwd).subscribe(response=>
    {
      if(response.status==true)
      {
        sessionStorage.setItem('currentUser', this.login.userID);
        this.router.navigate(['/Home']);
      }
      else
      {
        alert('failed login');
      }
    });
  }

}
