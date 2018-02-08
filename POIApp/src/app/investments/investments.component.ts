import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx';
import {InvestmentDetails} from '../InvestmentDetails'  

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  
  public LIC:String;
  public PPF:String;
  public NSC:String;
  public LICAmount:String;
  public PPFAmount:String;
  public NSCAmount:String;
  investmentDetails:InvestmentDetails;
  invDetails :InvestmentDetails[]=[];
  date:number=Date.now();
  constructor(private http:Http) { }
  
  ngOnInit() {
  }
  fileChange(event,name) {  
    debugger;  
    let fileList: FileList = event.target.files;  
    let file : File=fileList[0];
    this.investmentDetails =new InvestmentDetails();
    this.investmentDetails.Name=name;
    if(name.toLowerCase()=="lic")
    {
    this.investmentDetails.Amount=this.LICAmount;
    this.LIC= fileList[0].name; 
    }
    else if(name.toLowerCase()=="ppf")
    {
       this.investmentDetails.Amount=this.PPFAmount;
       this.PPF= fileList[0].name;  
    } 
    else if(name.toLowerCase()=="nsc")
    {
      this.investmentDetails.Amount=this.NSCAmount;
      this.NSC= fileList[0].name;  
     } 
    this.investmentDetails.FileInfo=file;
    this.invDetails.push(this.investmentDetails);
    if (fileList.length > 0) {  
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
    }
  }
}
