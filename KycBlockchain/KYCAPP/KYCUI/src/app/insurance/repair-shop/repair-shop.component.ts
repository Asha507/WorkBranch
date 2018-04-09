import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block.service';
import { RepairService } from '../repair.service';
import { RepairModel } from '../RepairModel';

@Component({
  selector: 'app-repair-shop',
  templateUrl: './repair-shop.component.html',
  styleUrls: ['./repair-shop.component.css']
})
export class RepairShopComponent implements OnInit {
  hasrecords:boolean=false;
  repairRecords:RepairModel[];
  constructor(private blockService: BlockService,private repairService:RepairService) { }

  ngOnInit() {
    this.repairService.GetRepairRecords().subscribe(response => {
      debugger;
      if (response != "[]") {
        this.hasrecords = true;
        this.repairRecords = JSON.parse(response);
      }

    });
  }

}
