import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InvestmentService } from '../services/investment.service';
import { IFieldTemplate } from '../IFieldTemplate';
import { MonthNames } from '../Months';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  id: string = localStorage.getItem("VamID");
  userName: string = localStorage.getItem("Username");
  MobileNumber: number;
  configValues: any;
  date: number = Date.now();
  Fields_80C: IFieldTemplate[];
  Fields_Others: IFieldTemplate[];
  guideLines: Array<string>;
  showUploadbtn: any = [];
  othersshowUploadbtn: any = [];
  showRentUploadbtn: any = false;
  fieldsData: any = [];
  filesToUpload: Array<File> = [];
  hasError: boolean = false;
  hasSizeError: any = [];
  hasOthersError: boolean = false;
  hasOthersSizeError: any = [];
  errorMessage: string;
  formHasError: boolean = false;
  months: any;
  rentAmount: number = 0;
  RntRctFile: String="";
  PanFile: String="";
  RntAggFile: String="";
  emailID:String;
  medRctFile:String="";
  showMedicalUploadbtn:boolean=false;
  medAmount:number=0;
  constructor(private investmentService: InvestmentService) { }

  ngOnInit() {
    this.GetJsonData();
    this.GetGuideLines();
    this.GetConfigurationData();
    this.GetMobileEmail();
    this.months = MonthNames;
  }


  GetJsonData() {
    this.investmentService.GetJsonData().subscribe(response => {
      this.Fields_80C = response["80C"];
      this.Fields_Others = response["Others"];
    }
    );
  }

  GetConfigurationData() {
    this.investmentService.GetConfigData().subscribe(response => {
      this.configValues = response;
    }
    );
  }

  GetGuideLines() {
    this.investmentService.GetGuidelines().subscribe(response => {
      this.guideLines = response;
    }
    );
  }

GetMobileEmail()
{
  this.investmentService.GetMobileEmailDetails(+this.id).subscribe(response=>{
 
    this.MobileNumber=+JSON.stringify(response).split(',')[0].split(':')[1];
    this.emailID=JSON.stringify(response).split(',')[1].split(':')[1];

  });
}

  AmountChanged(event, row, index) {
    if (event.target.value == 0 || event.target.value == "") {
      this.showUploadbtn[index] = false;
      this.hasSizeError[index] = false;
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
      this.hasOthersSizeError[index] = false;
      row.Amount = "";
      row.FileInfo = "";
      let file: number = this.filesToUpload.findIndex(item => item.name == row.FileName);
      row.FileName = "";
      
    }
    else {
      this.othersshowUploadbtn[index] = true;
    }
  }
  fileChange(event, row: IFieldTemplate, index, target) {
    this.hasError = false;
    this.hasOthersError = false;
    this.formHasError = false;
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    //if file already exists remove that file from filesToUpload array
    if(row.FileName!="")
    {
      let file: number = this.filesToUpload.findIndex(item => item.name == row.FileName);
      this.filesToUpload.splice(file, 1);
    }
    row.FileName = file.name;
    row.FileInfo = file;
    //Check file format
    if (+row.Amount > 0 && !(row.FileName.endsWith(".pdf"))) {
      if (target == "first") {
        this.hasError = true;
        this.errorMessage = "File should be in pdf format";
      }
      else if (target == "others") {
        this.hasOthersError = true;
        this.errorMessage = "File should be in pdf format";
      }
    }
    //check for file size
    else if (file.size >= 1024000000) {
      if (target == "first") {
        this.hasSizeError[index] = true;
      }
      else if (target == "others") {
        this.hasOthersSizeError[index] = true;
      }
      this.errorMessage = "File size should be max 10240";
      this.formHasError = true;
    }
    else {
      if (target == "first") {
        this.hasSizeError[index] = false;
      }
      else if (target == "others") {
        this.hasOthersSizeError[index] = false;
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

  SumRent(event) {
    this.rentAmount = 0;
    if (event.target.value == "")
    {
    event.target.value = 0;    
    let file: number = this.filesToUpload.findIndex(item => item.name == this.RntRctFile);
    if(file!=null)
    {
      this.filesToUpload.splice(file, 1);
    }
    let panfile: number = this.filesToUpload.findIndex(item => item.name == this.PanFile);
    if(file!=null)
    {
      this.filesToUpload.splice(panfile, 1);
    }
    let aggfile: number = this.filesToUpload.findIndex(item => item.name == this.RntAggFile);
    if(file!=null)
    {
      this.filesToUpload.splice(aggfile, 1);
    }
    }
    this.months.forEach(element => {
      if(element.Amount==null)
      {
        element.Amount=0;
      }
      this.rentAmount = +(this.rentAmount + parseInt(element.Amount));
    });

    if (this.rentAmount > 0) {
      this.showRentUploadbtn = true;
    }
    else{
      this.RntRctFile = "";      
      this.showRentUploadbtn = false;
    }
  }

  fileUpload(event, hracopy) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    if (hracopy == "pan") {
      this.PanFile = event.target.files[0].name;
    }
    else if (hracopy == "rent") {
      this.RntRctFile = event.target.files[0].name;
    }
    else if (hracopy == "aggrement") {
      this.RntAggFile = event.target.files[0].name;
    }
    else if (hracopy == "medical") {
      this.medRctFile = event.target.files[0].name;
    }
    this.filesToUpload.push(file);
  }

  MedicalAmountChange(event)
  {
    if(event.target.value > 0)
    {
      this.showMedicalUploadbtn=true;
      this.medAmount=event.target.value;
    }
    else if(event.target.value == 0 ||event.target.value=="")
    {
      this.showMedicalUploadbtn=true;
      this.medRctFile="";
    }
  }

  SubmitClick() {
    this.fieldsData.push(this.Fields_80C);
    this.fieldsData.push(this.Fields_Others);
    let formData: FormData = new FormData();
    formData.append('Data', JSON.stringify(this.fieldsData));
    formData.append('VamID', localStorage.getItem("VamID"));
    formData.append('EmployeeName', localStorage.getItem("Username"));
    formData.append('SubmissionDate', this.date.toString());
    formData.append('MobileNumber', this.MobileNumber.toString());
    formData.append('RentAmount', this.rentAmount.toString());
    formData.append('PanFile', this.PanFile!=""?this.PanFile.toString():"");
    formData.append('RentReciptFile', this.RntRctFile.toString());
    formData.append('AggrementFile', this.RntAggFile!=""?this.RntAggFile.toString():"");
    formData.append('Email',this.emailID.toString());
    formData.append('Medical_Amount',this.medAmount.toString());
    formData.append('Medical_File',this.medRctFile!=""?this.medRctFile.toString():"");
    for (var j = 0; j < this.filesToUpload.length; j++) {
      formData.append("file[]", this.filesToUpload[j], this.filesToUpload[j].name);
    }
    this.investmentService.UploadData(formData).subscribe(response => {
    }
    );
  }

  ResetAll() {
    for (var i = 0; i <= this.Fields_80C.length; i++) {
      this.showUploadbtn[i] = false;
      this.hasSizeError[i] = false;
    }
    // this.showUploadbtn=false;
  }

}
