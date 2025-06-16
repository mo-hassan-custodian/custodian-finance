import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MenuIcon, { SubmenuClass } from 'src/app/model/menu-icon';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  subitemClasses_general:SubmenuClass[] = [];
  showSideBar = true;
  menuitems:MenuIcon[] = [];
  activeSubmenu ?: MenuIcon;
  subitemClasses_transaction?: SubmenuClass[];
  subitemClasses_policy?: SubmenuClass[];
  subitemClasses_report?: SubmenuClass[];
  subitemClasses_setup?: SubmenuClass[];


  constructor(private _httpClient:HttpClient) {
   this.menuitems = [
    {
      "menuname": "Setup",
      "iconname": "settings",
      "submenuclass": [
        {
          "name": "Customer",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Manage Customer",
              "route": "/App/AllClients",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "New Customer",
              "route": "/App/CreateCustomer",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "Rate Setup ",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Setup",
              "route": "/App/rate-setup",
              "routeParameters": {}
            },
            // {
            //   "icon": "visibility",
            //   "name": "New Customer",
            //   "route": "/App/CreateCustomer",
            //   "routeParameters": {}
            // },
          ]
        },
      ]
    },
    {
      "menuname": "Underwriting",
      "iconname": "library_books",
      "submenuclass": [
        {
          "name": "New Business",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/NewProposal",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Convert to Proposal",
              "route": "/App/ConvertProposal",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Convert to Policy",
              "route": "",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Authorize Policy",
              "route": "/App/authorize-proposals",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "Renewal",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/renewal",
              "routeParameters": {}
            },
          ]
        },
      ]
    },
    ]
  }

  async setMenuInfo(){

    let menuendpoint = ''//environment.baseURL+ "bootstrap";
    let postData = {
      email:"",
      applicationId:""
    }
    this.setCurrentActiveSubMenu(0);
    // await this._httpClient.post<any>(menuendpoint, postData).toPromise().then(
    //   (response:any)=>{
    //     this.menuitems = JSON.parse(response.data);
    //     var item = this.menuitems.find(x => x.menuname == "Transaction");
    //     if(item == null){
    //       item = new MenuIcon("test","test",[]);
    //     }
    //       item.submenuclass[0].submenu[0].route = "/underwriting/dcnote";
    //   } ,
    //   (error : HttpErrorResponse)=>{
    //       //this._toastr.error("Error fetching Menu information", "Error",{ closeButton:true, disableTimeOut:true });
    //   }
    // );
    return  this.menuitems;
  }



  setCurrentActiveSubMenu(index:number){
    var icons = document.getElementsByClassName("main-menu-icon") as HTMLCollection;
    for(let count = 0; count < icons.length ; count++ ){
      icons[count].classList.remove("active-menu");
    }
    icons.item(index)?.classList.add("active-menu");
    this.activeSubmenu = this.menuitems[index];
  }




}
