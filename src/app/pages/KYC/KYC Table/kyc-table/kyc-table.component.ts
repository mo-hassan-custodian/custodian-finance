import { Component, OnInit, ViewChild } from '@angular/core';
import { KycCreationComponent } from '../KYC creation/kyc-creation/kyc-creation.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kyc-table',
  templateUrl: './kyc-table.component.html',
  styleUrls: ['./kyc-table.component.scss']
})
export class KycTableComponent implements OnInit {

  headers = ['docType', 'docNum','submitted', 'uploadDate','file', 'action'];
  status = [
    {
      name:'YES',
      value:'Y',
    },
    {
      name:'NO',
      value:'N',
    },
    {
      name:'EXEMPTED',
      value:'E',
    }
  ]
  Files = [
    {
      documentType: 'Completed Proposal Form',
      documentName: 'File 1',
      documentNumber: 'I002',
      submissionStatus:'N',
      uploadDate:'04/03/2025'
    },
    {
      documentType: 'Completed Proposal Form',
      documentName: 'File 1',
      documentNumber: 'I002',
      submissionStatus:'Y',
      uploadDate:'04/03/2025'
    },
    {
      documentType: 'Completed Proposal Form',
      documentName: 'File 1',
      documentNumber: 'I002',
      submissionStatus:'E',
      uploadDate:'04/03/2025'
    },
    {
      documentType: 'Completed Proposal Form',
      documentName: 'File 1',
      documentNumber: 'I002',
      submissionStatus:'N',
      uploadDate:'04/03/2025'
    }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort= new MatSort();
  dataSource=new MatTableDataSource();
  private dialogRef!: MatDialogRef<any>;

  constructor(public dialog: MatDialog, ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource<any>(this.Files);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openModal(element:any) {
    this.dialogRef = this.dialog.open(KycCreationComponent,{
      width:'70%',
      height:'70%',
      data:element   
    });
  }
  createBeneficiary() {
    this.dialogRef = this.dialog.open(KycCreationComponent,{
      width:'70%',
      height:'70%'
    });
  }

}

