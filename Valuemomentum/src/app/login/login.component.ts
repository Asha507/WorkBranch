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
  alert(this.authenticationService.Authenticate());
}

}
