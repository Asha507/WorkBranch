import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any={};
  constructor(private authenticationService:AuthenticationService,private router:Router) { }
  ngOnInit() {
  }
Login(){

  this.authenticationService.Authenticate(this.login.userID,this.login.pwd).subscribe(response=>
  {
    if(response.status==true)
    {
      localStorage.setItem('currentUser', this.login.userID);
      this.router.navigate(['Home']);
    }
    else
    {
      alert('failed login');
    }
  });
}

}
