import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateBeneficiaryComponent } from '../createBeneficiary/create-beneficiary/create-beneficiary.component';

@Component({
  selector: 'app-beneficiary-table',
  templateUrl: './beneficiary-table.component.html',
  styleUrls: ['./beneficiary-table.component.scss']
})
export class BeneficiaryTableComponent implements OnInit {

  headers = ['Surname','OtherName', 'DOB','Relation', 'inputPercentage'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort= new MatSort();
  dataSource=new MatTableDataSource();
  private dialogRef!: MatDialogRef<any>;

  constructor(public dialog: MatDialog, ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openModal(element:any) {
    this.dialogRef = this.dialog.open(CreateBeneficiaryComponent,{
      width:'70%',
      height:'70%',
      data:element   
    });
  }
  createBeneficiary() {
    this.dialogRef = this.dialog.open(CreateBeneficiaryComponent,{
      width:'70%',
      height:'70%'
    });
  }

}
