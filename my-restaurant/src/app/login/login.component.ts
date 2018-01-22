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
    debugger;
  this.loginService.Authenticate(this.login.userID,this.login.pwd).subscribe(response=>
    {
      debugger;
      if(response.status==true)
      {
        localStorage.setItem('currentUser', this.login.userID);
        this.router.navigate(['Dashboard']);
      }
      else
      {
        alert('failed login');
      }
    });
  }

}
