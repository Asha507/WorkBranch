import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InvestmentService } from '../services/investment.service';
import { IFieldTemplate } from '../IFieldTemplate';
import { MonthNames } from '../Months';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  id: string = sessionStorage.getItem("VamID");
  userName: string = sessionStorage.getItem("Username");
  MobileNumber: string;
  configValues: any;
  date: any = Date.now();
  Fields_80C: IFieldTemplate[];
  Fields_Others: IFieldTemplate[];
  guideLines: Array<string>;
  showUploadbtn: any = [];
  othersshowUploadbtn: any = [];
  showRentUploadbtn: any = false;
  showPanUploadbtn: any = false;
  showAggrementUploadbtn: any = false;
  fieldsData: any = [];
  filesToUpload: Array<File> = [];
  hasError: boolean = false;
  hasSizeError: any = [];
  hasOthersError: boolean = false;
  hasOthersSizeError: any = [];
  errorMessage: string;
  formHasError: boolean = false;
  months: any = [];
  rentAmount: number = 0;
  RntRctFile: String = "";
  PanFile: String = "";
  RntAggFile: String = "";
  emailID: String;
  medRctFile: String = "";
  showMedicalUploadbtn: boolean = false;
  medAmount: number = 0;
  loading: boolean = true;
  hasPanError:boolean=false;
  hasrentError:boolean=false;
  hasAggError:boolean=false;
  hasMedError:boolean=false;
  errorPanMessage:string="Please upload Pan Card copy";
  errorRentMessage:string="Please upload rent receipt";
  errorAggMessage:string="Please upload rent aggrement"
  errorMedMessage:string="Please upload Medical documents";
  SubmitStatus:string="Processing";
  constructor(private investmentService: InvestmentService, private datePipe: DatePipe) {
    this.date = this.datePipe.transform(new Date()).toString();
  }

  ngOnInit() {
    this.GetJsonData();
    this.GetGuideLines();
    this.GetConfigurationData();
    this.months = MonthNames;
    this.UpdateMonths();
    this.GetMobileEmail();

  }

  UpdateMonths() {
    this.investmentService.GetMonthlyHra().subscribe(response => {
      debugger;
      if (response != "[]") {
        var updatedMonthDetails = JSON.parse(response, )[0];
        Object.entries(updatedMonthDetails).forEach(element => {
          if (element[0] == "RentReciptFile") {
            this.RntRctFile = element[1];
            this.showRentUploadbtn=false;
          }
          else if (element[0] == "PanFile") {
            this.PanFile = element[1];
            this.showPanUploadbtn=false;
          }
          else if (element[0] == "AggrementFile") {
            this.RntAggFile = element[1];
            this.showAggrementUploadbtn=false;
          }
          else if (element[0] == "Total_Rent") {
            this.rentAmount = element[1];
          }
          else {
            this.months.forEach(subelement => {
              if (subelement.Name == element[0]) {
                subelement.Amount = element[1];
              }

            });
          }
        });
      }
      else {
        this.months = MonthNames;
      }
    });
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

  GetMobileEmail() {
    this.investmentService.GetMobileEmailDetails(+this.id).subscribe(response => {
      if (response != "") {
        this.MobileNumber = JSON.stringify(response).split(',')[0].split(':')[1];
        this.emailID = JSON.stringify(response).split(',')[1].split(':')[1];
      }
      this.loading = false;
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
    if (row.FileName != "") {
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
    if (event.target.value == "") {
      event.target.value = 0;
      let file: number = this.filesToUpload.findIndex(item => item.name == this.RntRctFile);
      if (file != null) {
        this.filesToUpload.splice(file, 1);
      }
      let panfile: number = this.filesToUpload.findIndex(item => item.name == this.PanFile);
      if (file != null) {
        this.filesToUpload.splice(panfile, 1);
      }
      let aggfile: number = this.filesToUpload.findIndex(item => item.name == this.RntAggFile);
      if (file != null) {
        this.filesToUpload.splice(aggfile, 1);
      }
    }
    this.months.forEach(element => {
      if (element.Amount == null) {
        element.Amount = 0;
      }
      this.rentAmount = +(this.rentAmount + parseInt(element.Amount));
    });

    if (this.rentAmount > 0) {
      this.showRentUploadbtn = true;
    }
    else {
      this.RntRctFile = "";
      this.showRentUploadbtn = false;
    }

    if (this.rentAmount > 100000) {
      this.showPanUploadbtn = true;
    }
    else {
      this.PanFile = "";
      this.showPanUploadbtn = false;
    }
    if (this.rentAmount > 180000) {
      this.showAggrementUploadbtn = true;
    }
    else {
      this.RntAggFile = "";
      this.showAggrementUploadbtn = false;
    }
    
  }

  fileUpload(event, hracopy) {
    this.formHasError=false;
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    if (hracopy == "pan") {
      this.PanFile = event.target.files[0].name;
      this.hasPanError =this.CheckFileFormat(event.target.files[0].name)
      if(this.hasPanError)
      {
        this.formHasError=true;
        this.errorPanMessage="File should be in pdf format";
      }
      else
      {
        this.hasPanError =this.CheckFileSize(event)
        if(this.hasPanError)
        {
          this.formHasError=true;
          this.errorPanMessage="File should max 102400";
        }
      }
    }
    else if (hracopy == "rent") {
      this.RntRctFile = event.target.files[0].name;
      this.hasrentError =this.CheckFileFormat(event.target.files[0].name)
      if(this.hasrentError)
      {
        this.errorRentMessage="File should be in pdf format";
        this.formHasError=true;
      }
      else
      {
        this.hasrentError =this.CheckFileSize(event)
        if(this.hasrentError)
        {
          this.errorRentMessage="File should max 102400";
          this.formHasError=true;
        }
      }
    }
    else if (hracopy == "aggrement") {
      this.RntAggFile = event.target.files[0].name;
      this.hasAggError =this.CheckFileFormat(event.target.files[0].name)
      if(this.hasAggError)
      {
        this.errorRentMessage="File should be in pdf format";
        this.formHasError=true;
      }
      else
      {
        this.hasAggError =this.CheckFileSize(event)
        if(this.hasAggError)
        {
          this.errorRentMessage="File should max 102400";
          this.formHasError=true;
        }
      }
    }
    else if (hracopy == "medical") {
      this.medRctFile = event.target.files[0].name;
      this.hasMedError =this.CheckFileFormat(event.target.files[0].name)
      if(this.hasMedError)
      {
        this.errorMedMessage="File should be in pdf format";
        this.formHasError=true;
      }
      else
      {
        this.hasMedError =this.CheckFileSize(event)
        if(this.hasMedError)
        {
          this.errorMedMessage="File should max 102400";
          this.formHasError=true;
        }
      }
    }
    this.filesToUpload.push(file);
  }
  CheckFileFormat(fileName):boolean
  {
    return !fileName.endsWith(".pdf")?true:false;
  }
  CheckFileSize(event):boolean
  {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    return file.size >= 102400?true:false;
      }
  MedicalAmountChange(event) {
    if (event.target.value > 0) {
      this.showMedicalUploadbtn = true;
      this.medAmount = event.target.value;
    }
    else if (event.target.value == 0 || event.target.value == "") {
      this.showMedicalUploadbtn = true;
      this.medRctFile = "";
    }
  }

  SubmitClick() {
    this.loading = true;
    this.fieldsData.push(this.Fields_80C);
    this.fieldsData.push(this.Fields_Others);
    let formData: FormData = new FormData();
    formData.append('Data', JSON.stringify(this.fieldsData));
    formData.append('VamID', sessionStorage.getItem("VamID"));
    formData.append('EmployeeName', sessionStorage.getItem("Username"));
    formData.append('SubmissionDate', this.date.toString());
    formData.append('MobileNumber', this.MobileNumber.toString());
    formData.append('RentAmount', this.rentAmount.toString());
    formData.append('PanFile', this.PanFile != "" ? this.PanFile.toString() : "");
    formData.append('RentReciptFile', this.RntRctFile.toString());
    formData.append('AggrementFile', this.RntAggFile != "" ? this.RntAggFile.toString() : "");
    formData.append('Email', this.emailID.toString());
    formData.append('Medical_Amount', this.medAmount.toString());
    formData.append('Medical_File', this.medRctFile != "" ? this.medRctFile.toString() : "");
    formData.append('HraAmount', JSON.stringify(this.months));
    for (var j = 0; j < this.filesToUpload.length; j++) {
      formData.append("file[]", this.filesToUpload[j], this.filesToUpload[j].name);
    }
    this.investmentService.UploadData(formData).subscribe(response => {
      this.loading = false;
      if(response=="Uploaded Sucessfully")
      {
        this.SubmitStatus="Data Submitted Successfully";
      }
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
