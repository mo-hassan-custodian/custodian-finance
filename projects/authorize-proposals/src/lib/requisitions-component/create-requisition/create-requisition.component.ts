import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  // Removed @ViewChild('createRequisitionModal') since we're not using intermediate modal anymore
  searchForm: FormGroup;
  searched: boolean = false;
  isProposal: boolean = false;
  searchResults: any[] = [];
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
      size: 'xl',
      centered: true,
      windowClass: 'payee-modal-window'
    });

    modalRef.result.then(
      (payeeData) => {
        // Handle successful payee creation
        console.log('Payee created successfully:', payeeData);
        this.toastr.success(`Payee "${payeeData.payee}" created successfully!`);

        // You can add logic here to:
        // 1. Save the payee data to a service/database
        // 2. Navigate to a requisition details page
        // 3. Add the payee to a list for selection
        // 4. Perform other business logic

        // Example: Navigate to requisition details with the new payee
        // this.router.navigate(['/App/requisition-details'], {
        //   queryParams: { payeeId: payeeData.code }
        // });
      },
      () => {
        // Handle modal dismissal (user clicked cancel or closed modal)
        console.log('Payee modal dismissed');
      }
    ).catch((error) => {
      // Handle any errors
      console.error('Error with payee modal:', error);
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

    console.log('Processed CSV Data:', data);
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

  // View Details Button Handler
}
