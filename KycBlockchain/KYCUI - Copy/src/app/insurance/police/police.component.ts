import { Component, OnInit } from '@angular/core';
import { PoliceModel } from '../PoliceModel';
import { PoliceService } from '../police.service';

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.css']
})
export class PoliceComponent implements OnInit {

  thefts:PoliceModel;
  constructor(private policeService:PoliceService) { }

  ngOnInit() {
    debugger;
    this.policeService.GetTheftDetails().subscribe(response=>{
      debugger;
      this.thefts=JSON.parse(response);
    });
  }

}
