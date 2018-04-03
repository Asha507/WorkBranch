import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.css']
})
export class SelfServiceComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string='';
  constructor(private loginService: LoginService,private router:Router) { }

  ngOnInit() {
  }

  Login() {
    debugger;
    let formData = new FormData();
    formData.append("UserName", this.username);
    formData.append("Password", this.password);
    this.loginService.Login(formData).subscribe(response => {
      if (response != "Invalid") { 
        debugger;
        sessionStorage.setItem("Email",response); 
        this.router.navigate(['insurance/self-service/contracts']);
      }
      else {
        this.errorMessage = "Username or Password is invalid";
      }
    });
  }

}
