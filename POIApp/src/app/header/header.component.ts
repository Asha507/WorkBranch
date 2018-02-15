import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Base64 } from 'js-base64';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  vamID: string;
  vamName: string;
  constructor(private route: ActivatedRoute) { 
      this.route.queryParams
      .subscribe(params => {
        if (undefined != params.param) {
        let decodedString=Base64.decode(params.param);
        var id=decodedString.split('&')[0];
        var userName=decodedString.split('&')[1];
        if (undefined != userName) {
          localStorage.setItem("Username", userName);
        }
        if (undefined != id) {
          localStorage.setItem("VamID", id);
        }

        this.vamID = localStorage.getItem("VamID");
        this.vamName = localStorage.getItem("Username");
       
        }
      });
  }

  ngOnInit() {

  }

}
