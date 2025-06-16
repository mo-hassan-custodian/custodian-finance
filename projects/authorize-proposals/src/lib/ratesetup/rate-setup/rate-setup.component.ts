import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-rate-setup',
  templateUrl: './rate-setup.component.html',
  styleUrls: ['./rate-setup.component.css'],
})
export class RateSetupComponent implements OnInit {
  showForm = false;
  isReplicating = false;
  originalFormValues: any;
  products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  productOptions: { id: number; name: string }[] = [];
  selectedProduct: number | null = null;
  selectedOption: number | null = null;
  productOptionsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productOptionsForm = this.fb.group({
      shortDescription: [''],
      description: [''],
      remarks: [''],
      partlyMaturityPercent: [0],
      maturityLastPeriod: [0],
      claimMonthlyInstallments: [0],
      totalMaturityAmount: [0],
      svFactorTable: [''],
      sbBonusFactorTable: [''],
      surrValComputationFormula: [''],
      paidupValComputationFormula: [''],
      partialMaturityPaymentFrequency: [''],
      investmentPremPerc: [0],
      partialMaturityFrqType: [''],
      usePeriodsAsDivFact: [false],
      termDistribution: [''],
      minTermYrs: [0],
      maxTermYrs: [0],
      saComputation: [''],
      paidupRate: [0],
      tBonusRate: [0],
      escalationType: [''],
      minRetireAge: [0],
      maxRetireAge: [0],
      maxPremiumPayingTerm: [0],
      minPremiumPayingTerm: [0],
      calcPremiumTermFromAssuredAge: [false],
      minInvestmentAmount: [0],
      maxInvestmentAmount: [0],
      optionCurrency: [''],
      defaultPremiumMask: [''],
      withBonus: [false],
      termPeriodIn: [''],
    });
  }

  ngOnInit(): void {}

  showStepper = false; // Controls visibility of the stepper

  // Stepper Data
  newProductOption = {
    shortDescription: '',
    description: '',
    remarks: '',
    partlyMaturityPercent: 0,
    maturityLastPeriod: 0,
    claimMonthlyInstallments: 0,
    totalMaturityAmount: 0,
    svFactorTable: '',
    sbBonusFactorTable: '',
    surrValComputationFormula: '',
    paidupValComputationFormula: '',
    partialMaturityPaymentFrequency: '',
    investmentPremPerc: 0,
    partialMaturityFrqType: '',
    usePeriodsAsDivFact: false,
    termDistribution: '',
    minTermYrs: 0,
    maxTermYrs: 0,
    saComputation: '',
    paidupRate: 0,
    tBonusRate: 0,
    escalationType: '',
    minRetireAge: 0,
    maxRetireAge: 0,
    maxPremiumPayingTerm: 0,
    minPremiumPayingTerm: 0,
    calcPremiumTermFromAssuredAge: false,
    minInvestmentAmount: 0,
    maxInvestmentAmount: 0,
    optionCurrency: '',
    defaultPremiumMask: '',
    withBonus: false,
    termPeriodIn: '',
  };
  coverTypes = ['Basic', 'Premium', 'Gold'];
  selectedCoverTypes: string[] = [];
  paymentFrequencies = ['Monthly', 'Quarterly', 'Yearly'];
  selectedPaymentFrequency: string | null = null;

  onProductSelect(productId: number) {
    this.selectedProduct = productId;
    this.selectedOption = null; // Reset selected option
    this.loadProductOptions(productId);
  }

  onOptionSelect(optionId: number) {
    this.selectedOption = optionId;
  }

  onAction(action: string) {
    switch (action) {
      case 'new':
        this.showForm = true;
        this.isReplicating = false;
        this.productOptionsForm.reset(); // Reset form for new entry
        break;
      case 'replicate':
        this.showForm = true;
        this.isReplicating = true;
        // Populate form with existing values for editing
        this.productOptionsForm.patchValue(this.originalFormValues);
        break;
      case 'delete':
        console.log('Delete action clicked');
        break;
      default:
        console.log('Unknown action');
    }
  }

  onStepperComplete() {
    if (this.isReplicating && !this.isFormEdited()) {
      console.log('No changes made. Form not saved.');
      this.showForm = false;
      return;
    }

    // Save or replicate the form data
    console.log('Form Data:', this.productOptionsForm.value);
    this.showForm = false;
  }

  private isFormEdited(): boolean {
    return (
      JSON.stringify(this.productOptionsForm.value) !==
      JSON.stringify(this.originalFormValues)
    );
  }

  private loadProductOptions(productId: number) {
    // Simulate loading product options based on the selected product
    this.productOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ];
  }

  private resetStepperData() {
    this.newProductOption = {
      shortDescription: '',
      description: '',
      remarks: '',
      partlyMaturityPercent: 0,
      maturityLastPeriod: 0,
      claimMonthlyInstallments: 0,
      totalMaturityAmount: 0,
      svFactorTable: '',
      sbBonusFactorTable: '',
      surrValComputationFormula: '',
      paidupValComputationFormula: '',
      partialMaturityPaymentFrequency: '',
      investmentPremPerc: 0,
      partialMaturityFrqType: '',
      usePeriodsAsDivFact: false,
      termDistribution: '',
      minTermYrs: 0,
      maxTermYrs: 0,
      saComputation: '',
      paidupRate: 0,
      tBonusRate: 0,
      escalationType: '',
      minRetireAge: 0,
      maxRetireAge: 0,
      maxPremiumPayingTerm: 0,
      minPremiumPayingTerm: 0,
      calcPremiumTermFromAssuredAge: false,
      minInvestmentAmount: 0,
      maxInvestmentAmount: 0,
      optionCurrency: '',
      defaultPremiumMask: '',
      withBonus: false,
      termPeriodIn: '',
    };
    this.selectedCoverTypes = [];
    this.selectedPaymentFrequency = null;
  }
}
