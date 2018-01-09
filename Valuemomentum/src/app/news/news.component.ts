import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

public news ;
  constructor(private newsService:NewsService,private router:Router) { }

  ngOnInit() {
    this.newsService.getNews().subscribe(response=>
    {
    alert(response.status);
    }
    );
  }

}
