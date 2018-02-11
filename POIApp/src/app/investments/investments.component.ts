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
  id:string=localStorage.getItem("VamID");
  userName:string=localStorage.getItem("Username");
  debugger;
  date: number = Date.now();
  Fields_80C: IFieldTemplate[];
  Fields_Others: IFieldTemplate[];
  guideLines: Array<string>;
  showUploadbtn: any = [];
  othersshowUploadbtn: any = [];
  fieldsData: any = [];
  filesToUpload:Array<File>=[];  
  constructor(private investmentService: InvestmentService) { }

  ngOnInit() {
    this.GetJsonData();
    this.GetGuideLines();
  }

  GetJsonData() {
    this.investmentService.GetJsonData().subscribe(response => {
      debugger;
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
    debugger;
    if (event.target.value == 0 || event.target.value == "") {
      this.showUploadbtn[index] = false;
      row.FileName = "";
      row.Amount = 0;
    }
    else {
      this.showUploadbtn[index] = true;
    }
  }
  OthersAmountChanged(event, row, index) {
    debugger;
    if (event.target.value == 0 || event.target.value == "") {
      this.othersshowUploadbtn[index] = false;
      row.FileName = "";
      row.Amount = 0;
    }
    else {
      this.othersshowUploadbtn[index] = true;
    }
  }
  fileChange(event, row: IFieldTemplate) {
    debugger;
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    row.FileName = file.name;
    row.FileInfo = file;
    this.filesToUpload.push(file);
    // switch(name.toLowerCase())
    // {
    //   case 'lic':
    //   this.investmentDetails.SNO="1";
    //   this.investmentDetails.Amount=this.LICAmount;
    //   this.LIC= fileList[0].name; 
    //   break;
    //   case 'ppf':
    //   this.investmentDetails.SNO="2";
    //   this.investmentDetails.Amount=this.PPFAmount;
    //   this.PPF= fileList[0].name;  
    //   break;
    //   case 'nsc':
    //   this.investmentDetails.SNO="3";
    //   this.investmentDetails.Amount=this.NSCAmount;
    //   this.NSC= fileList[0].name;  
    //   break;
    // }
    // this.investmentDetails.FileInfo=file;
    // this.invDetails.push(this.investmentDetails);
    // if (fileList.length > 0) {
    // if(name.toLowerCase()=="lic")
    // {
    //   this.LIC= fileList[0].name;  
    // }
    // else if(name.toLowerCase()=="ppf")
    // {
    //   this.PPF= fileList[0].name;  
    // } 
    // else if(name.toLowerCase()=="nsc")
    // {
    //   this.NSC= fileList[0].name;  
    // } 
    // let formData: FormData = new FormData();  
    // formData.append('uploadFile', file, file.name);
    // formData.append('VamID', localStorage.getItem("VamID")); 
    // formData.append('FileType', name); 
    // let headers = new Headers()  

    // let options = new RequestOptions({ headers: headers });  
    // let apiUrl1 = "http://localhost:61808/api/File/UploadFile"; 
    // this.http.post(apiUrl1, formData, options)  
    // .map(res => res.json())  
    // .catch(error => Observable.throw(error))  
    // .subscribe(  
    // data => alert('success'),  
    // error => alert(error)  
    // )  
    // }
    //End of FileChange

  }
  SubmitClick() {
    this.fieldsData.push(this.Fields_80C);
    this.fieldsData.push(this.Fields_Others);
    let formData: FormData = new FormData();
    formData.append('Data', JSON.stringify(this.fieldsData));
    formData.append('VamID', localStorage.getItem("VamID"));
    formData.append('EmployeeName', localStorage.getItem("Username"));
    formData.append('SubmissionDate',this.date.toString());
    for (var j = 0; j < this.filesToUpload.length; j++) {
      formData.append("file[]", this.filesToUpload[j], this.filesToUpload[j].name);
  }
    this.investmentService.UploadData(formData).subscribe(response => {

    }
    );
  }

}
