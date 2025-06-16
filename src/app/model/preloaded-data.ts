export interface CurrencyType {
    name:string;
    value:string; 
}
export interface UnitType {
    name:string;
    value:string; 
      }
  
export interface IAPIResponseModel<T>{
    status:number;
    message:string;
    data:T
}

export interface IBranchModel{
    address: string;
    branchId: string;
    branchManager: string;
    branchName: string;
    branchNumber: string;
    keyDate: string;
    locationName: string;
    locationNumber: string;
    telephoneNumber: string;
  }

  export interface IAPIResponseSuccess {
    data: any;
    message: string;
    status: number;
}

export interface ReceiptAPIResponseSuccess {
    responseData: any;
    message: string;
    status: number;
    dataFormat:string;
}

export interface IAPIResponseError {
    ErrorDescription: string;
    ExceptionType: string;
}
export   class CurrentUserOBject {
    id = "";
    sessionId = "";
    token="";
    tokenend="";
  }

  export interface PreloadedResponseSucess {
    isPaginated: boolean;
    totalRecords: number,
    pageSize: number,
    pageNumber: number,
    responseData: any;
    status: string;
  message: any;
  dataFormat: string
  }
  

  export interface preloadedData {
    key : string;
    name : string;
  }