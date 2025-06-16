export interface GenerateReceipt{
  receiptDate: string;
  branchCode: string;
  debitAccount: string;
  creditAccount: string;
  transAmount: number;
  nairaAmountInWords: string;
  koboAmountInWords: string;
  purpose: string;
  receivedFrom: string;
  receiptType: string;
  paymentType: string;
  premiumDue: number;
  premiumPaid: number;
  balanceAmt: number;
  coverNoteNo: number;
  cheqDate: string
  debitSerialNo: number;
  creditSerialNo: number;
  cheqNum: string;
  debitCreditNoteNo: string;
  currencyType: string;
}



export interface GetReceipt {
    receiptDate:string;
    branchCode: string;
    debitAccount: string;
    creditAccount: string;
    transAmount: number;
    nairaAmountInWords: string;
    koboAmountInWords: string;
    purpose: string;
    receivedFrom: string;
    receiptType: string;
    paymentType: string;
    premiumDue: number;
    premiumPaid: number;
    balanceAmt: number;
    coverNoteNo: number;
    cheqDate: string;
    debitSerialNo: number;
    creditSerialNo: number;
    cheqNum: string;
    debitCreditNoteNo: string;
    currencyType: string;
    transNum: string;
    dnCnDate: string;
    riskCode: string;
    refType: string;
    accidentClass: boolean;
    carClass: boolean;
    engClass: boolean;
    fireClass: boolean;
    marineClass: boolean;
    motorClass: boolean;
    wcClass: boolean;
    claimsClass: boolean;
    othersClass: boolean;
    userId: string;
}

export interface ReceiptType {
  key:string;
  name: string
}

export interface AuthorizeClaims {

  transNum: string,
  policyNum: string,
  receiptDate: string,
  unit: number,
  branchCode: string,
  debitAccount: string,
  creditAccount: string,
  transAmount: number,
  purpose: string,
  receiptType: string,
  paymentType: string,
  cheqDate: string,
  cheqNum: string,
  userId: string,
  branchName: string,
  glAccountName: string,
  brokerName: string,
  paymentMode: string,
  debitNoteDate: string,
  userName: string

}

export interface ItransactionList{
  transNum: string,
  policyNum: string,
  receiptDate: string,
  unit: number,
  branchCode: string,
  debitAccount: string,
  creditAccount: string,
  transAmount: number,
  purpose: string,
  receiptType: string,
  paymentType: string,
  cheqDate: string,
  cheqNum: string,
  userId: string,
  branchName: string,
  glAccountName: string,
  brokerName: string,
  paymentMode: string,
  debitNoteDate: string,
  userName: string
  checked:boolean
}

export interface INameValue {
  name: string;
  value: string;
}

export interface postingModel {
 
    recordNumber: number,
    processDate: string,
    branchNumber: string,
    batchNumber: string,
    serialNumber: number,
    subSerialNumber: number,
    unitNumber: number,
    transactionID: string,
    transactionDate:string,
    transactionNumber: string,
    transactionType: string,
    recordType: string,
    ledgerType: string,
    code: string,
    accountNumber: string,
    transactionAmount: number,
    cashOrCheque: string,
    chequeNumber: string,
    chequeDate: string,
    currencyNumber: string,
    currencyRate: number,
    localAmount: number,
    description: string,
    beneficiaryName: string,
    policyNumber: string,
    subRiskNumber: string,
    referenceDate: string,
    referenceNumber: string,
    referenceType: string,
    referenceQuantity: number,
    referenceRate: number,
    filler: string,
    operationID: string
 
}

export interface TableData {
  [key: string]: string;
}