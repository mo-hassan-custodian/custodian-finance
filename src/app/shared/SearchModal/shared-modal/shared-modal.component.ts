import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { MockServiceService } from 'src/app/services/mock-service.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent implements OnInit {

  @Output() returnFunction = new EventEmitter<any>();
  SearchForm = new FormGroup({
    search: new FormControl('',),
  });

  allData: any = [];
  displayedColumns = [ 'Name', 'Value', 'Address','Status',];
  inputData:any;

  constructor(public mockService:MockServiceService, public spinner:NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any, public toastr:ToastrService,public dialogRef: MatDialogRef<SharedModalComponent>,) { 
    this.inputData = data;
    this.SearchForm.get('search')?.valueChanges.pipe(debounceTime(1000)).subscribe(
      (search:any)=>{  
        this.spinner.show();
        setTimeout(() => {
          this.mockService.searchFromModal(this.inputData.Url, search).subscribe((res:any)=>{
            this.allData = res;
            this.spinner.hide();
          },(error:HttpErrorResponse)=>{
            this.toastr.error(error.message);
            this.spinner.hide();
          })
        }, 1500);
      } 
    );
  }

  ngOnInit(): void {
  }

  doThis(){
    
  }
  
  toggleSelection(row:any){
    this.dialogRef.close(row);
  }
}
