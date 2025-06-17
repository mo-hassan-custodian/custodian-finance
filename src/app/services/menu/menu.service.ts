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
      "menuname": "Core Setup",
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
      "menuname": "General Ledger",
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
    {
      "menuname": "Cash Book",
      "iconname": "money",
      "submenuclass": [
        {
          "name": "CB - Parameters",
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
          "name": "CB - Transactions",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Requisitions",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Create Requisition",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Payments",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Setup Payment Templates",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Setup Cheque Numbers",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Consolidate Requisitions",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Split Cheques",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Authorize",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Print",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Update Printed Payments",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Update PD Cheques",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Cheque Signing Setup",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Cheque Signing Mandate",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Currency Exceptions Setup",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "H2H Statuses",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Dispatch Cheques",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Cancel Payments",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Authorize Canceled Cheques",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Stale Payments",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Dispatch Cheque Preview",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Cheques Status",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Authorise File Transfer Payments",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "File Transfer Download",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "File Transfer Statuses",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Update File Transfer Status",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Authorise Canceled EFTs",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "VAT/WHTAX Certificate",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
            {
              "icon": "visibility",
              "name": "Reports",
              "route": "/App/setup-payments",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Petty Cash",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Receipts",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Reconciliations",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
        {
          "name": "CB - Inquiries",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
      ]
    },
    {
      "menuname": "Debtors",
      "iconname": "business_center",
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
          "name": "create-requisition",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
              "routeParameters": {}
            },
          ]
        },
      ]
    },
    {
      "menuname": "Creditors",
      "iconname": "party_mode",
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
          "name": "create-requisition",
          "submenu": [
            {
              "icon": "visibility",
              "name": "Data Capture",
              "route": "/App/create-requisition",
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
