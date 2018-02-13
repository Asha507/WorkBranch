import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
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
        if (undefined != params.Name) {
          localStorage.setItem("Username", params.Name);
        }
        if (undefined != params.id) {
          localStorage.setItem("VamID", params.id);
        }

        this.vamID = localStorage.getItem("VamID");
        this.vamName = localStorage.getItem("Username");
      });
  }

  ngOnInit() {

  }

}
