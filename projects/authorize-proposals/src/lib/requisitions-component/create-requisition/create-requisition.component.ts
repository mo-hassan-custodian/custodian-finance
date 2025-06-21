import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
//import { ClientSetupComponent } from '../client-setup/client-setup.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBeneficiaryComponent } from 'src/app/pages/Beneficiary/createBeneficiary/create-beneficiary/create-beneficiary.component';

@Component({
  selector: 'lib-create-requisition',
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.scss'],
})
export class CreateRequisitionComponent implements OnInit {
  @ViewChild('batchUploadModal') batchUploadModal: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchForm: FormGroup;
  searched: boolean = false;
  isProposal: boolean = false;
  searchResults: any[] = [];
  displayedColumns: string[] = ['code', 'payeeName', 'amount','invoiceNumber','narrations','bankAcoount', 'payeeBank', "status", "actions",];
  dataSource = new MatTableDataSource([
    { code: 'REQ-001', payeeName: 'Zahra Musa', amount: 50000, 'payeeBank': "GTB", "status": "Pending", "invoiceNumber": "002"},
    { code: 'REQ-002', payeeName: 'Tari Obi', amount: 65000, 'payeeBank': "UBA", "status": "Pending",  "invoiceNumber": "002"},
    { code: 'REQ-003', payeeName: 'Kunle Adebayo', amount: 30000, 'payeeBank': "Access Bank","status": "Pending",  "invoiceNumber": "002"},
    { code: 'REQ-003', payeeName: 'Kunle Adebayo', amount: 30000, 'payeeBank': "Access Bank", "status": "Pending",  "invoiceNumber": "002"},
  ]);

  // displayedColumns: string[] = [
  //   'code',
  //   'payeeName',
  // 'invoiceNumber',
  // 'amount',
  // 'chequeDate',
  // 'narration',
  // 'bankAccount',
  // 'type',
  // 'paymentOption',
  // 'payeeAccountNo',
  // 'payeeBank'
  // ];


  openModal() {
    this.modalService.open(this.batchUploadModal, {
      backdrop: 'static',
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  authorize(element: any) {

  this.dialog.open(CreateBeneficiaryComponent,{
          width:'70%',
          height:'70%',
          data:element   
        });
      }
  

  reject(element: any){

  }

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
