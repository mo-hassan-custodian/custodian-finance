import { Component, OnInit, AfterViewInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ClientSetupComponent } from '../client-setup/client-setup.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllCLientsComponent implements OnInit {

  headers = ['PolicyNumber','Name', 'Product','Occupation', 'Number', 'DOB', 'action'];
  clients = [];
  searchForm:FormGroup;
  searched: boolean = false;
  isProposal:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort= new MatSort();
  @Input('sourceC') set sourceC(value: boolean) {
    this.isProposal = value;
  }
  @Output() returnClient = new EventEmitter<any>();

  dataSource=new MatTableDataSource();
  private dialogRef!: MatDialogRef<any>;

  constructor( public dialog: MatDialog, public toastr:ToastrService, 
    public mockService:MockServiceService, public spinner:NgxSpinnerService,) {
    this.searchForm = new FormGroup({
      policyNumber:new FormControl (""),
      surname:new FormControl (""),
      otherNames:new FormControl (""),
      dob:new FormControl (""),
      number:new FormControl (""),
      accountNumber:new FormControl (""),
      clientType:new FormControl (""),
      employmentNumber:new FormControl (""),
    })
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openModal(element:any) {
    
  }
  selectClient(element:any) {
    element.isProposal = true;
    const dialogRef = this.dialog.open(ClientSetupComponent,{
      width:'70%',
      height:'70%',
      data:element,   
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.returnClient.emit(result);
      } else {
        this.toastr.error('Unable to retreive Client')
      }
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource!.filter = filterValue.trim().toLowerCase();
  // }

  search(){
    this.spinner.show();
    setTimeout(() => {
      this.mockService.getClients().subscribe((res:any)=>{
        this.clients = res;
        this.dataSource = new MatTableDataSource<any>(this.clients);
        this.dataSource.paginator = this.paginator;
        this.searched = true; 
        this.spinner.hide();
      },(error:HttpErrorResponse)=>{
        this.toastr.error(error.message);
        this.spinner.hide();
      })
    }, 1500);
    
  }
  create(){
    const dialogRef = this.dialog.open(ClientSetupComponent,{
      width:'70%',
      height:'70%',
      data:'',   
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.returnClient.emit(result);
      } else {
        this.toastr.error('Unable to retreive Client')
      }
    });
  }

}
