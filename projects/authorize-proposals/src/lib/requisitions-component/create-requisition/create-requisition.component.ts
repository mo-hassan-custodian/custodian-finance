import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayeeModalComponent } from '../../components/payee-modal/payee-modal.component';

@Component({
  selector: 'lib-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css'],
})
export class CreateRequisitionComponent implements OnInit {
  @ViewChild('generalLedgerModal') generalLedgerModal!: TemplateRef<any>;

  searchForm: FormGroup;
  generalLedgerForm: FormGroup;
  searched: boolean = false;
  isProposal: boolean = false;
  searchResults: any[] = [];
  generalLedgerEntries: any[] = [];
  displayedColumns: string[] = [
    'policyNumber',
    'proposalNumber',
    'clientName',
    'phoneNumber',
    'product',
    'status',
  ];

  // Removed old openModal method since we're directly opening payee modal now

  openPayeeModal() {
    // Directly open the payee modal without intermediate modal
    const modalRef = this.modalService.open(PayeeModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg', // Changed from 'xl' to 'lg' for smaller modal
      centered: true,
      windowClass: 'payee-modal-window'
    });

    modalRef.result.then(
      (payeeData) => {
        // Handle successful payee creation
        this.toastr.success(`Payee "${payeeData.payee}" created successfully!`);

        // You can add logic here to:
        // 1. Save the payee data to a service/database
        // 2. Navigate to a requisition details page
        // 3. Add the payee to a list for selection
        // 4. Perform other business logic
      },
      () => {
        // Handle modal dismissal (user clicked cancel or closed modal)
      }
    ).catch((error) => {
      // Handle any errors
      this.toastr.error('An error occurred while processing the payee data');
    });
  }

  constructor(
    public dialog: MatDialog,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpClient,
    private fb: FormBuilder,
    public mockService: MockServiceService,
    public spinner: NgxSpinnerService
  ) {
    this.searchForm = this.fb.group({
      policyNumber: [''],
      proposalNumber: [''],
      clientName: [''],
      phoneNumber: [''],
    });

    this.generalLedgerForm = this.fb.group({
      autoApportion: ['', Validators.required],
      costCenterName: ['', Validators.required],
      expenseTypeName: ['', Validators.required],
      branch: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountName: ['', Validators.required],
      narrative: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      side: ['', Validators.required],
      vatRate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  viewDetails(item: any) {
    // this.router.navigate(['/details', item.proposalNumber]);

    this.router.navigate(['/App/requisition-details'], {
      queryParams: { id: item.id },
    });
    this.modalService.dismissAll();
  }

  downloadSampleCSV() {
    const sampleData = [
      [
        'RETIRE AGE',
        'ANB FROM',
        'ANB TO',
        'RATE',
        'DIVISION FACTOR',
        'WEF DATE',
        'WET DATE',
        'AGE DIFF',
      ],
      ['60', '18', '65', '0.05', '1.0', '2023-01-01', '2023-12-31', '47'],
      ['65', '18', '70', '0.06', '1.1', '2023-01-01', '2023-12-31', '52'],
    ];

    const csvContent = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sample.csv';
    link.click();
  }

  // Handle CSV file upload
  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        this.processCSVData(csvData);
      };
      reader.readAsText(file);
    }
  }

  // Process the uploaded CSV data
  processCSVData(csvData: string) {
    const rows = csvData.split('\n').filter((row) => row.trim() !== ''); // Split rows and remove empty lines
    const headers = rows[0].split(',').map((header) => header.trim()); // Extract headers

    const data = rows.slice(1).map((row) => {
      const values = row.split(',').map((value) => value.trim()); // Split row values
      return headers.reduce((obj: any, header, index) => {
        obj[header] = values[index]; // Map headers to values
        return obj;
      }, {});
    });

    // Add logic to process the data (e.g., send it to an API or display it in a table)
  }

  search(modalContent: any) {
    const params = this.searchForm.value;

    // Remove empty or null parameters
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    this.http.get<any[]>('http://localhost:3000/proposals').subscribe(
      (data) => {
        // Filter the data based on search criteria
        this.searchResults = data.filter((proposal) => {
          return (
            (!params.policyNumber ||
              proposal.policyNumber.includes(params.policyNumber)) &&
            (!params.proposalNumber ||
              proposal.proposalNumber.includes(params.proposalNumber)) &&
            (!params.clientName ||
              proposal.clientName.includes(params.clientName)) &&
            (!params.phoneNumber ||
              proposal.phoneNumber.includes(params.phoneNumber))
          );
        });

        // Open the modal to display the search results
        this.modalService.open(modalContent, {
          centered: true,
          backdrop: 'static',
          size: 'lg',
        });
      },
      (error) => {
        console.error('Error fetching proposals:', error);
      }
    );
  }

  // General Ledger Methods
  openGeneralLedgerModal() {
    this.modalService.open(this.generalLedgerModal, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  addGeneralLedgerEntry() {
    if (this.generalLedgerForm.valid) {
      const formValue = this.generalLedgerForm.value;

      // Create new entry
      const newEntry = {
        id: Date.now(), // Simple ID generation
        autoApportion: formValue.autoApportion,
        costCenterName: this.getCostCenterDisplayName(formValue.costCenterName),
        expenseTypeName: this.getExpenseTypeDisplayName(formValue.expenseTypeName),
        branch: this.getBranchDisplayName(formValue.branch),
        accountNumber: formValue.accountNumber,
        accountName: this.getAccountDisplayName(formValue.accountName),
        narrative: formValue.narrative,
        amount: parseFloat(formValue.amount),
        side: formValue.side,
        vatRate: parseFloat(formValue.vatRate)
      };

      // Add to entries array
      this.generalLedgerEntries.push(newEntry);

      // Reset form
      this.generalLedgerForm.reset();

      // Show success message
      this.toastr.success('General ledger entry added successfully!');
    } else {
      this.toastr.error('Please fill in all required fields correctly');
    }
  }

  removeGeneralLedgerEntry(index: number) {
    this.generalLedgerEntries.splice(index, 1);
    this.toastr.info('Entry removed successfully');
  }

  getTotalDebit(): number {
    return this.generalLedgerEntries
      .filter(entry => entry.side === 'debit')
      .reduce((total, entry) => total + entry.amount, 0);
  }

  getTotalCredit(): number {
    return this.generalLedgerEntries
      .filter(entry => entry.side === 'credit')
      .reduce((total, entry) => total + entry.amount, 0);
  }

  getBalanceDifference(): number {
    return this.getTotalDebit() - this.getTotalCredit();
  }

  saveGeneralLedger() {
    if (this.generalLedgerEntries.length === 0) {
      this.toastr.warning('No entries to save');
      return;
    }

    if (this.getBalanceDifference() !== 0) {
      this.toastr.warning('General ledger is not balanced. Please adjust entries.');
      return;
    }

    // Here you would typically save to a service/API
    console.log('Saving general ledger entries:', this.generalLedgerEntries);

    this.toastr.success('General ledger saved successfully!');
    this.modalService.dismissAll();
  }

  // Helper methods to get display names
  private getCostCenterDisplayName(value: string): string {
    const costCenters: { [key: string]: string } = {
      'admin': 'Administration',
      'sales': 'Sales & Marketing',
      'operations': 'Operations',
      'finance': 'Finance',
      'hr': 'Human Resources',
      'it': 'Information Technology'
    };
    return costCenters[value] || value;
  }

  private getExpenseTypeDisplayName(value: string): string {
    const expenseTypes: { [key: string]: string } = {
      'office_supplies': 'Office Supplies',
      'travel': 'Travel & Transportation',
      'utilities': 'Utilities',
      'professional_services': 'Professional Services',
      'insurance': 'Insurance',
      'maintenance': 'Maintenance & Repairs',
      'training': 'Training & Development'
    };
    return expenseTypes[value] || value;
  }

  private getBranchDisplayName(value: string): string {
    const branches: { [key: string]: string } = {
      'head_office': 'Head Office - Victoria Island',
      'lagos_ikeja': 'Lagos Branch - Ikeja',
      'abuja_wuse': 'Abuja Branch - Wuse II',
      'portharcourt_gra': 'Port Harcourt Branch - GRA',
      'kano_sabon': 'Kano Branch - Sabon Gari',
      'ibadan_bodija': 'Ibadan Branch - Bodija'
    };
    return branches[value] || value;
  }

  private getAccountDisplayName(value: string): string {
    const accounts: { [key: string]: string } = {
      'cash_bank': 'Cash at Bank',
      'petty_cash': 'Petty Cash',
      'accounts_payable': 'Accounts Payable',
      'capital_account': 'Capital Account',
      'revenue_account': 'Revenue Account',
      'operating_expenses': 'Operating Expenses',
      'admin_expenses': 'Administrative Expenses'
    };
    return accounts[value] || value;
  }

  // View Details Button Handler
}
