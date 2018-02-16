import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InvestmentService } from '../services/investment.service';
import { IFieldTemplate } from '../IFieldTemplate';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  id: string = localStorage.getItem("VamID");
  userName: string = localStorage.getItem("Username");
  date: number = Date.now();
  Fields_80C: IFieldTemplate[];
  Fields_Others: IFieldTemplate[];
  guideLines: Array<string>;
  showUploadbtn: any = [];
  othersshowUploadbtn: any = [];
  fieldsData: any = [];
  filesToUpload: Array<File> = [];
  hasError:boolean=false;
  hasSizeError:any=[];
  hasOthersError:boolean=false;
  hasOthersSizeError:any=[];
  errorMessage:string;
  formHasError:boolean=false;
  constructor(private investmentService: InvestmentService) { }

  ngOnInit() {
    this.GetJsonData();
    this.GetGuideLines();
  }

  GetJsonData() {
    this.investmentService.GetJsonData().subscribe(response => {      
      this.Fields_80C = response["80C"];
      this.Fields_Others = response["Others"];
    }
    );
  }

  GetGuideLines() {
    this.investmentService.GetGuidelines().subscribe(response => {
      this.guideLines = response;
    }
    );
  }
  AmountChanged(event, row, index) {
    if (event.target.value == 0 || event.target.value == "") {
      this.showUploadbtn[index] = false;
      this.hasSizeError[index]=false;
      row.Amount = "";
      row.FileInfo = "";
      let file: number = this.filesToUpload.findIndex(item => item.name == row.FileName);
      row.FileName = "";
      this.filesToUpload.splice(file, 1);
    }
    else {
      this.showUploadbtn[index] = true;
    }
  }
  OthersAmountChanged(event, row, index) {
    if (event.target.value == 0 || event.target.value == "") {
      this.othersshowUploadbtn[index] = false;
      this.hasOthersSizeError[index]=false;
      row.Amount = "";
      row.FileInfo = "";
      let file: number = this.filesToUpload.findIndex(item => item.name == row.FileName);
      row.FileName = "";
      this.filesToUpload.splice(file, 1);
    }
    else {
      this.othersshowUploadbtn[index] = true;
    }
  }
  fileChange(event, row: IFieldTemplate,index,target) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    row.FileName = file.name;
    row.FileInfo = file;
    if(+row.Amount>0 && !(row.FileName.endsWith(".pdf")))
    {
      if(target=="first")
      {
      this.hasError=true;
      this.errorMessage="File should be in pdf format";
      }
     else if(target=="others")
      {
      this.hasOthersError=true;
      this.errorMessage="File should be in pdf format";
      }
    }
    else if(file.size>=10240)
    {
      if(target=="first")
      {
      this.hasSizeError[index]=true;
      }
      else if(target=="others")
      {
        this.hasOthersSizeError[index]=true;
      }
      this.errorMessage="File size should be max 10240";
      this.formHasError=true;
    }
  else{
    if(target=="first")
    {
    this.hasSizeError[index]=false;
    }
    else if(target=="others")
    {
      this.hasOthersSizeError[index]=false;
    }
    this.filesToUpload.push(file);
  }
  }

  isFormEmpty(): boolean {
    let isEmpty: boolean = true;
    this.Fields_80C.forEach(element => {
      if (+element.Amount > 0) {
        isEmpty = false;
      }
    });
    this.Fields_Others.forEach(element => {
      if (+element.Amount > 0) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }
  SubmitClick() {
    this.fieldsData.push(this.Fields_80C);
    this.fieldsData.push(this.Fields_Others);
    let formData: FormData = new FormData();
    formData.append('Data', JSON.stringify(this.fieldsData));
    formData.append('VamID', localStorage.getItem("VamID"));
    formData.append('EmployeeName', localStorage.getItem("Username"));
    formData.append('SubmissionDate', this.date.toString());
    for (var j = 0; j < this.filesToUpload.length; j++) {
      formData.append("file[]", this.filesToUpload[j], this.filesToUpload[j].name);
    }    
    this.investmentService.UploadData(formData).subscribe(response => {
    }
    );
  }

  ResetAll()
  {
    for(var i = 0; i <= this.Fields_80C.length; i++){
      this.showUploadbtn[i]=false;
      this.hasSizeError[i]=false;
   }
    // this.showUploadbtn=false;
  }

}
