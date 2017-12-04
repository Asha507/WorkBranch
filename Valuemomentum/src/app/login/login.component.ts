import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any={};
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }
Login(){
  this.authenticationService.Authenticate().subscribe(response=>
  {
    if(response.status==true)
    {
      alert('Sucessfully logged in');
    }
    else
    {
      alert('failed login');
    }
  });
}

}
