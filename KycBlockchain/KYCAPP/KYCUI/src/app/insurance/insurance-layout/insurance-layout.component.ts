import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block.service';

@Component({
  selector: 'app-insurance-layout',
  templateUrl: './insurance-layout.component.html',
  styleUrls: ['./insurance-layout.component.css']
})
export class InsuranceLayoutComponent implements OnInit {
  buttonStatus:string="Show";
  blocks:any;
  isBlockExplorer:boolean=false;

  constructor(private blockService:BlockService) { }

  ngOnInit() {

  }
  ShowHideexplorer()
  {
    if(this.buttonStatus=="Hide")
    {
      this.buttonStatus="Show";
      this.isBlockExplorer=false;
    }
    else
    {
      this.buttonStatus="Hide";
     this.blockService.GetBlocks().subscribe(response=>{
      debugger;
    this.blocks=response;
    this.isBlockExplorer=true;
    });
    }
  }
}
