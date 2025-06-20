import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';
import { PayeeModel, PaymentOption, PayeeType, Currency, BankBranch } from '../../models/payee.model';
// Removed MockServiceService import since we're using only static data

@Component({
  selector: 'lib-payee-modal',
  templateUrl: './payee-modal.component.html',
  styleUrls: ['./payee-modal.component.scss']
})
export class PayeeModalComponent implements OnInit, OnDestroy {
  payeeForm!: FormGroup;

  // ViewChildren to access all mat-select dropdowns
  @ViewChildren(MatSelect) matSelects!: QueryList<MatSelect>;

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
  }

  ngOnDestroy(): void {
    // Force close any open dropdowns when component is destroyed
    this.closeAllDropdowns();
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
    // Force close any open dropdowns before dismissing modal
    this.closeAllDropdowns();

    // Small delay to ensure dropdowns are closed
    setTimeout(() => {
      this.activeModal.dismiss();
    }, 50);
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
  trackByValue(_index: number, item: any): any {
    return item.value;
  }

  // Method to force close all open dropdowns
  private closeAllDropdowns(): void {
    try {
      // Method 1: Close using ViewChildren (more targeted)
      if (this.matSelects) {
        this.matSelects.forEach(select => {
          if (select.panelOpen) {
            select.close();
          }
        });
      }

      // Method 2: Fallback - Close using DOM queries
      const matSelects = document.querySelectorAll('mat-select');
      matSelects.forEach(select => {
        const selectElement = select as HTMLElement;
        selectElement.blur();
      });

      // Method 3: Close any CDK overlays that might be open
      const overlays = document.querySelectorAll('.cdk-overlay-backdrop, .cdk-overlay-pane');
      overlays.forEach(overlay => {
        const overlayElement = overlay as HTMLElement;
        if (overlayElement.click) {
          overlayElement.click();
        }
      });

      // Method 4: Trigger escape key to close any open overlays
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escapeEvent);

    } catch (error) {
      console.warn('Error closing dropdowns:', error);
    }
  }


}
