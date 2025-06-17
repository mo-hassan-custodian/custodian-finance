import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-renewal-details',
  templateUrl: './renewal-details.component.html',
  styleUrls: ['./renewal-details.component.css']
})
export class RenewalDetailsComponent implements OnInit {

  element = {
    policyNumber: 'POL123456',
    proposalNumber: 'PROP98765',
    status: 'Active',
    maturityDate: new Date(2030, 11, 25),
    product: 'Life Insurance',
    effectiveDate: new Date(2022, 5, 15),
    assured: 'John Doe',
    lifeAssured: 'John Doe',
    jointLifeAssured: 'Jane Doe',
    occupation: 'Software Engineer',
    branch: 'New York',
    premiumAutoIncrement: 'Yes',
    paidToDate: new Date(2024, 7, 1),
    underwritingYear: 2022,
    proposalSignDate: new Date(2022, 3, 10),
    inceptionDate: new Date(2022, 4, 5),
    referenceNo: 'REF00123',
    policyClientStatus: 'Verified',
    monthlyIncome: 5000,
    acceptanceDate: new Date(2022, 6, 20),
    submissionDate: new Date(2022, 2, 25),
    commissionAmount: new Date(2022, 2, 25),
    totalPremiumPaid: '200000',
    boDebitDay:new Date(2022, 2, 25),
    boStartDate: new Date(2022, 2, 25),
    workingANB: 'New',
    bankAccount: '2136475674',
    lifeClass: 'Class A',
    productOption: 'Option 1',
    premiumMask: 'ES Default',
    agent: 'Mark Ojo',
    agentCode: '0003452',
    marketer: '',
    paymentMode: '',
    paymentFrequency: 'Monthly',
    term: '2',
    lifeRider: '',
    coinsurance: '',
    retirementAge: '',
    lifeCoverFactor: '',
    lapseTime: '',
    returnFromDate: '',
    returnToDate: '',
    checkoffAgent: 'Mark',
    allocatedAmount: '0.00',
    policyStatus: 'active',
  }
  receipts = [
    { number: 'RCP-001', date: new Date(), transDate:new Date(), deductionDate: new Date(),
       chequeNo: 'Johnson', oldReceiptNo: '', receiptAmt: '100000', premiumAllocation: '256.23', penAllocation: '87657.98',
       loanAllocation: '', policyFee: '0.00', reInstalAllocation: '', compensateFund: '0.00'},

       { number: 'RCP-002', date: new Date(), transDate:new Date(), deductionDate: new Date(),
        chequeNo: 'Mark', oldReceiptNo: '', receiptAmt: '230000', premiumAllocation: '256.23', penAllocation: '87657.98',
        loanAllocation: '', policyFee: '0.00', reInstalAllocation: '', compensateFund: '0.00'},

        { number: 'RCP-003', date: new Date(), transDate:new Date(), deductionDate: new Date(),
          chequeNo: 'Juliet', oldReceiptNo: '', receiptAmt: '430000', premiumAllocation: '256.23', penAllocation: '87657.98',
          loanAllocation: '', policyFee: '0.00', reInstalAllocation: '', compensateFund: '0.00'},
  ];

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}
