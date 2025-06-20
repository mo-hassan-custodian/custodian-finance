import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PayeeModel, PaymentOption, PayeeType, Currency, BankBranch } from '../../models/payee.model';
// Removed MockServiceService import since we're using only static data

@Component({
  selector: 'lib-payee-modal',
  templateUrl: './payee-modal.component.html',
  styleUrls: ['./payee-modal.component.scss']
})
export class PayeeModalComponent implements OnInit {
  payeeForm!: FormGroup;
  
  // Dropdown options - will be initialized in constructor
  paymentOptions: PaymentOption[] = [];
  payeeTypes: PayeeType[] = [];
  currencies: Currency[] = [];

  bankBranches: BankBranch[] = [];
  bankAccounts: any[] = [];

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.initializeForm();
    this.initializeDropdownData();
  }

  ngOnInit(): void {
    // Additional data loading (though most should be done in constructor)
    this.loadBankBranches();
    this.loadBankAccounts();

    // Force a timeout to ensure everything is loaded
    setTimeout(() => {
      console.log('=== PayeeModalComponent ngOnInit (After Timeout) ===');
      console.log('Bank Branches:', this.bankBranches?.length || 0, this.bankBranches);
      console.log('Bank Accounts:', this.bankAccounts?.length || 0, this.bankAccounts);
      console.log('Payment Options:', this.paymentOptions?.length || 0, this.paymentOptions);
      console.log('Payee Types:', this.payeeTypes?.length || 0, this.payeeTypes);
      console.log('Currencies:', this.currencies?.length || 0, this.currencies);
      console.log('Form initialized:', !!this.payeeForm);
      console.log('Form value:', this.payeeForm?.value);
    }, 100);
  }

  private initializeForm(): void {
    this.payeeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      inputChequePayee: ['', Validators.required],
      payee: ['', Validators.required],
      payeeBankBranch: ['', Validators.required],
      payeeAccountNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      narrative: ['', [Validators.required, Validators.maxLength(500)]],
      invoiceNo: ['', Validators.required],
      invoiceDate: [null, Validators.required], // Changed to null for proper date picker handling
      amount: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['NGN', Validators.required],
      bankAccount: ['', Validators.required],
      type: ['', Validators.required],
      paymentOption: ['', Validators.required]
    });
  }

  private initializeDropdownData(): void {
    // Initialize all dropdown data immediately in constructor
    this.loadBankBranches();
    this.loadBankAccounts();

    // Ensure all arrays are properly initialized
    console.log('Initializing dropdown data...');
    console.log('Payment Options before:', this.paymentOptions?.length);
    console.log('Payee Types before:', this.payeeTypes?.length);
    console.log('Currencies before:', this.currencies?.length);

    // Force initialization if arrays are undefined
    if (!this.paymentOptions || this.paymentOptions.length === 0) {
      this.initializePaymentOptions();
    }
    if (!this.payeeTypes || this.payeeTypes.length === 0) {
      this.initializePayeeTypes();
    }
    if (!this.currencies || this.currencies.length === 0) {
      this.initializeCurrencies();
    }

    console.log('Payment Options after:', this.paymentOptions?.length);
    console.log('Payee Types after:', this.payeeTypes?.length);
    console.log('Currencies after:', this.currencies?.length);
  }

  private initializePaymentOptions(): void {
    this.paymentOptions = [
      { name: 'Electronic Fund Transfer (EFT)', value: 'EFT' },
      { name: 'Real Time Gross Settlement (RTGS)', value: 'RTGS' },
      { name: 'Automated Clearing House (ACH)', value: 'ACH' },
      { name: 'Bank Draft', value: 'BANK_DRAFT' },
      { name: 'Certified Cheque', value: 'CERTIFIED_CHEQUE' },
      { name: 'Company Cheque', value: 'COMPANY_CHEQUE' },
      { name: 'Cash Payment', value: 'CASH' },
      { name: 'Mobile Money Transfer', value: 'MOBILE_MONEY' },
      { name: 'Online Banking Transfer', value: 'ONLINE_BANKING' },
      { name: 'Standing Order', value: 'STANDING_ORDER' },
      { name: 'Direct Debit', value: 'DIRECT_DEBIT' },
      { name: 'Wire Transfer', value: 'WIRE_TRANSFER' }
    ];
  }

  private initializePayeeTypes(): void {
    this.payeeTypes = [
      { name: 'Individual Client', value: 'INDIVIDUAL_CLIENT' },
      { name: 'Corporate Client', value: 'CORPORATE_CLIENT' },
      { name: 'Insurance Broker', value: 'INSURANCE_BROKER' },
      { name: 'Reinsurance Company', value: 'REINSURANCE_COMPANY' },
      { name: 'Medical Provider', value: 'MEDICAL_PROVIDER' },
      { name: 'Legal Service Provider', value: 'LEGAL_SERVICE' },
      { name: 'Claims Adjuster', value: 'CLAIMS_ADJUSTER' },
      { name: 'Government Agency', value: 'GOVERNMENT_AGENCY' },
      { name: 'Vendor/Supplier', value: 'VENDOR_SUPPLIER' },
      { name: 'Contractor', value: 'CONTRACTOR' },
      { name: 'Consultant', value: 'CONSULTANT' },
      { name: 'Employee', value: 'EMPLOYEE' },
      { name: 'Agent/Representative', value: 'AGENT_REPRESENTATIVE' },
      { name: 'Financial Institution', value: 'FINANCIAL_INSTITUTION' },
      { name: 'Regulatory Body', value: 'REGULATORY_BODY' }
    ];
  }

  private initializeCurrencies(): void {
    this.currencies = [
      { name: 'Nigerian Naira', value: 'NGN', symbol: '₦' },
      { name: 'US Dollar', value: 'USD', symbol: '$' },
      { name: 'British Pound Sterling', value: 'GBP', symbol: '£' },
      { name: 'Euro', value: 'EUR', symbol: '€' },
      { name: 'South African Rand', value: 'ZAR', symbol: 'R' },
      { name: 'Ghanaian Cedi', value: 'GHS', symbol: '₵' },
      { name: 'Kenyan Shilling', value: 'KES', symbol: 'KSh' },
      { name: 'Canadian Dollar', value: 'CAD', symbol: 'C$' },
      { name: 'Australian Dollar', value: 'AUD', symbol: 'A$' },
      { name: 'Japanese Yen', value: 'JPY', symbol: '¥' },
      { name: 'Swiss Franc', value: 'CHF', symbol: 'CHF' },
      { name: 'Chinese Yuan', value: 'CNY', symbol: '¥' }
    ];
  }

  private loadBankBranches(): void {
    // Enhanced dummy data for bank branches - using only static data
    this.bankBranches = [
      { name: 'Head Office - Victoria Island', value: 'HO_VI', bankName: 'Custodian Bank' },
      { name: 'Lagos Branch - Ikeja', value: 'LAG_IKJ', bankName: 'Custodian Bank' },
      { name: 'Abuja Branch - Wuse II', value: 'ABJ_WUS', bankName: 'Custodian Bank' },
      { name: 'Port Harcourt Branch - GRA', value: 'PHC_GRA', bankName: 'Custodian Bank' },
      { name: 'Kano Branch - Sabon Gari', value: 'KAN_SGB', bankName: 'Custodian Bank' },
      { name: 'Ibadan Branch - Bodija', value: 'IBD_BOD', bankName: 'Custodian Bank' },
      { name: 'Kaduna Branch - Barnawa', value: 'KAD_BAR', bankName: 'Custodian Bank' },
      { name: 'Benin Branch - Ring Road', value: 'BEN_RNG', bankName: 'Custodian Bank' },
      { name: 'Enugu Branch - Independence Layout', value: 'ENU_IND', bankName: 'Custodian Bank' },
      { name: 'Calabar Branch - Marian Road', value: 'CAL_MAR', bankName: 'Custodian Bank' }
    ];

    console.log('Bank branches loaded:', this.bankBranches.length);
  }

  private loadBankAccounts(): void {
    // Enhanced dummy data for bank accounts with different account types
    this.bankAccounts = [
      { name: 'Main Operating Account - 0123456789 (Current)', value: '0123456789' },
      { name: 'Petty Cash Account - 0987654321 (Savings)', value: '0987654321' },
      { name: 'Investment Account - 1122334455 (Investment)', value: '1122334455' },
      { name: 'Claims Settlement Account - 2233445566 (Current)', value: '2233445566' },
      { name: 'Premium Collection Account - 3344556677 (Current)', value: '3344556677' },
      { name: 'Commission Account - 4455667788 (Current)', value: '4455667788' },
      { name: 'Reinsurance Account - 5566778899 (Current)', value: '5566778899' },
      { name: 'Staff Welfare Account - 6677889900 (Savings)', value: '6677889900' },
      { name: 'Training & Development Account - 7788990011 (Savings)', value: '7788990011' },
      { name: 'Emergency Fund Account - 8899001122 (Savings)', value: '8899001122' }
    ];

    console.log('Bank accounts loaded:', this.bankAccounts.length);
  }

  onSave(): void {
    if (this.payeeForm.valid) {
      const formValue = this.payeeForm.value;

      // Format the date properly for submission
      const payeeData: PayeeModel = {
        ...formValue,
        invoiceDate: formValue.invoiceDate ?
          new Date(formValue.invoiceDate).toISOString().split('T')[0] : ''
      };

      // Here you would typically save to a service/API
      console.log('Payee Data:', payeeData);

      this.toastr.success('Payee created successfully!');
      this.activeModal.close(payeeData);
    } else {
      this.markFormGroupTouched();
      this.toastr.error('Please fill in all required fields correctly');
    }
  }

  onCancel(): void {
    this.activeModal.dismiss();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.payeeForm.controls).forEach(key => {
      const control = this.payeeForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Helper method to check if a field has errors and is touched
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.payeeForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && field.touched;
    }
    return field.invalid && field.touched;
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.payeeForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
    if (errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${this.getFieldDisplayName(fieldName)} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['pattern']) return `${this.getFieldDisplayName(fieldName)} format is invalid`;
    if (errors['min']) return `${this.getFieldDisplayName(fieldName)} must be greater than ${errors['min'].min}`;
    
    return 'Invalid input';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      code: 'Code',
      inputChequePayee: 'Input Cheque Payee',
      payee: 'Payee',
      payeeBankBranch: 'Payee Bank Branch',
      payeeAccountNo: 'Payee Account Number',
      narrative: 'Narrative',
      invoiceNo: 'Invoice Number',
      invoiceDate: 'Invoice Date',
      amount: 'Amount',
      currency: 'Currency',
      bankAccount: 'Bank Account',
      type: 'Type',
      paymentOption: 'Payment Option'
    };
    
    return displayNames[fieldName] || fieldName;
  }

  // Utility method to generate auto code based on payee name
  onPayeeNameChange(): void {
    const payeeName = this.payeeForm.get('payee')?.value;
    const codeControl = this.payeeForm.get('code');

    if (payeeName && !codeControl?.value) {
      // Generate a simple code from payee name
      const code = payeeName.substring(0, 3).toUpperCase() +
                   Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      codeControl?.setValue(code);
    }
  }

  // Utility method to auto-fill cheque payee from payee name
  onPayeeChange(): void {
    const payeeName = this.payeeForm.get('payee')?.value;
    const chequePayeeControl = this.payeeForm.get('inputChequePayee');

    if (payeeName && !chequePayeeControl?.value) {
      chequePayeeControl?.setValue(payeeName);
    }
  }

  // Method to get today's date for date picker
  getTodayDate(): Date {
    return new Date();
  }

  // Method to get max date (e.g., 30 days from today)
  getMaxDate(): Date {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate;
  }

  // Method to format currency display
  formatCurrency(amount: number, currencyCode: string): string {
    const currency = this.currencies.find(c => c.value === currencyCode);
    return currency ? `${currency.symbol}${amount.toLocaleString()}` : amount.toString();
  }

  // TrackBy function for better performance in ngFor
  trackByValue(index: number, item: any): any {
    return item.value;
  }

  // Debug method to check dropdown data
  checkDropdownData(): void {
    console.log('=== Dropdown Data Check ===');
    console.log('Bank Branches:', this.bankBranches?.length || 0, this.bankBranches);
    console.log('Bank Accounts:', this.bankAccounts?.length || 0, this.bankAccounts);
    console.log('Payment Options:', this.paymentOptions?.length || 0, this.paymentOptions);
    console.log('Payee Types:', this.payeeTypes?.length || 0, this.payeeTypes);
    console.log('Currencies:', this.currencies?.length || 0, this.currencies);
    console.log('Form Value:', this.payeeForm.value);

    // Force re-initialization if any arrays are empty
    if (!this.paymentOptions?.length) {
      console.log('Re-initializing payment options...');
      this.initializePaymentOptions();
    }
    if (!this.payeeTypes?.length) {
      console.log('Re-initializing payee types...');
      this.initializePayeeTypes();
    }
    if (!this.currencies?.length) {
      console.log('Re-initializing currencies...');
      this.initializeCurrencies();
    }
    if (!this.bankBranches?.length) {
      console.log('Re-initializing bank branches...');
      this.loadBankBranches();
    }
    if (!this.bankAccounts?.length) {
      console.log('Re-initializing bank accounts...');
      this.loadBankAccounts();
    }
  }
}
