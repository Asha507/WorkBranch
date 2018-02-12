import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 vamID:string;
 vamName:string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      localStorage.setItem("Username",params.Name);
      localStorage.setItem("VamID",params.id);
      this.vamID=localStorage.getItem("VamID");
      this.vamName=params.Name;    
    });
  }

}
