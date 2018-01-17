import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import { Router } from '@angular/router';
import {AnonymousSubscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private timerSubscription: AnonymousSubscription;
  constructor(private newsService:NewsService,private router:Router) { }
  news: Array<any> = Array();
  
  ngOnInit() {
    this.newsService.GetNews(10).subscribe(response=>
      {
       this.refreshData(10);
  }  );
}

SeeAll():void{
  this.newsService.GetNews(0).subscribe(response=>
    {
     this.refreshData(response.result.length);
}  );
}


  private refreshData(limit:number): void {
    this.newsService.GetNews(limit).subscribe(response=>
      {
    if(response.status==true)
    {
      while(this.news.length>0)
      {
      this.news.pop();
      }
      response.result.forEach(element => {
        
       this.news.push(element);
     });
    }
    else
    {
      alert('failed fetching news from service');
    }
  });
        this.subscribeToData(limit);
  
}

private subscribeToData(limit): void {
    this.timerSubscription =Observable.timer(5000).first().subscribe(() => this.refreshData(limit));
}
}
