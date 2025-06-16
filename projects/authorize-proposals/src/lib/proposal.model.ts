export interface Proposal {
  id: number;
  policyNumber: string;
  proposalNumber: string;
  surname: string;
  otherNames: string;
  product: string;
  occupation: string;
  number: string;
  dob: string;
  enddate: string;
  status: string;
  maturityDate: string;
  effectiveDate: string;
  assured: string;
  lifeAssured: string;
  jointLifeAssured: string;
  branch: string;
  endrNo: string;
  agent: string;
  agentCode: string;
  marketer: string;
  wefDate: string;
  productOption: string;
  premiumMask: string;
  anb: string;
  wetDate: string;
  commissionAmount: string;
  totalPremiumPaid: string;
  boDebitDay: string;
  boStartDate: string;
  workingAnb: string;
  bankAccount: string;
}

export interface Product {
  productId: string;
  shortDesc: string;
  description: string;
}
