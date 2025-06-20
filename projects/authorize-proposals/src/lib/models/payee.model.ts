export interface PayeeModel {
  code: string;
  inputChequePayee: string;
  payee: string;
  payeeBankBranch: string;
  payeeAccountNo: string;
  narrative: string;
  invoiceNo: string;
  invoiceDate: string;
  amount: number;
  currency: string;
  bankAccount: string;
  type: string;
  paymentOption: string;
}

export interface PaymentOption {
  name: string;
  value: string;
}

export interface PayeeType {
  name: string;
  value: string;
}

export interface Currency {
  name: string;
  value: string;
  symbol: string;
}

export interface BankBranch {
  name: string;
  value: string;
  bankName: string;
}
