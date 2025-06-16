import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  baseUrl = environment.apiUrl;
  
  Products: any[] = [];
  Branches: any[] = [];
  bool = [
    {
      name: 'Yes',
      value: 'Y'
    },
    {
      name: 'No',
      value: 'N'
    }
  ];
  allBanks:any[]=[];

  constructor(private _toastr:ToastrService, private _http:HttpClient, public toastr:ToastrService) {
    this.getBanks(environment.paystackSecret).subscribe((res:any)=>{
      this.allBanks = res.data;
    },(error:HttpErrorResponse)=>{
      this.toastr.error(error.message);
    });
    this.getProducts().subscribe((res:any)=>{
      this.Products = res;
    },(error:HttpErrorResponse)=>{
      this.toastr.error(error.message);
    });
    this.getBranches().subscribe((res:any)=>{
      this.Branches = res;
    },(error:HttpErrorResponse)=>{
      this.toastr.error(error.message);
    });
  }

  getClients(){
    return this._http.get(`${this.baseUrl}/clients`);
  }  
  createClient(data:any){
    return this._http.post(`${this.baseUrl}/clients`,data);
  }  
  getClient(id:any){
    return this._http.get(`${this.baseUrl}/clients?id=${id}`)
  }
  getBanks(secretKey:string){
    return this._http.get(`https://api.paystack.co/bank?"Authorization: Bearer Y=${secretKey}`)
  }
  getProducts(){
    return this._http.get(`${this.baseUrl}/Products`);
  }
  getBranches(){
    return this._http.get(`${this.baseUrl}/Branches`);
  }
  searchFromModal(context:string, searchData:string){
    return this._http.get(`${this.baseUrl}/${context}/?name=${searchData}`);
  }
}
