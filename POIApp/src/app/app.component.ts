import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMesage: string;
  id: string;
  userName: string;
  title = 'app';
  constructor(private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        debugger;
        if (undefined != params.param) {
          let decodedString = Base64.decode(params.param);

          var id = decodedString.split('&')[0].replace("VAM ", "");
          var userName = decodedString.split('&')[1];
          if (undefined != userName) {
            sessionStorage.setItem("Username", userName);
            this.userName = id;
          }
          if (undefined != id) {
            sessionStorage.setItem("VamID", id);
            this.id = id;
          }
          sessionStorage.setItem("IsValidSession","true");
        }
        else {
          if (sessionStorage.getItem("VamID") != undefined && sessionStorage.getItem("Username") != undefined) {
            this.id = sessionStorage.getItem("VamID");
            this.userName = sessionStorage.getItem("Username");
            sessionStorage.setItem("IsValidSession","true");
          }
          else {
           sessionStorage.setItem("IsValidSession","false");
          }
        }
      });
  }
}
