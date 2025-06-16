import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { AllCLientsComponent } from '../all-clients/all-clients.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-setup',
  templateUrl: './client-setup.component.html',
  styleUrls: ['./client-setup.component.scss']
})
export class ClientSetupComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper | undefined;
  clientForm:FormGroup;
  isProposal:boolean = false;
  isSanctioned:boolean = false;
  Titles = [
    {name: 'Mr'},
    {name: 'Mrs'},
    {name: 'Miss'}
  ];
  Gender = [
    {name: 'Male'},
    {name: 'Female'}
  ];
  MaritalStatus  = [
    {name: 'Single'},
    {name: 'Married'}
  ]
  constructor(public dialogRef: MatDialogRef<ClientSetupComponent>,@Inject(MAT_DIALOG_DATA) public data: any, 
  public spinner:NgxSpinnerService, public toastr:ToastrService, public mockService:MockServiceService) { 
    this.clientForm= new FormGroup ({
      id:new FormControl (""),
      title:new FormControl (""),
      surname:new FormControl (""),
      otherNames:new FormControl (""),
      gender:new FormControl (""),
      maritalStatus:new FormControl (""),
      nationality:new FormControl (""),
      occupation:new FormControl (""),
      dob:new FormControl (""),
      pep:new FormControl (""),
      email:new FormControl (""),
      number:new FormControl (""),
      address:new FormControl (""),
      height:new FormControl (0),
      weight:new FormControl (0),
      bank:new FormControl (""),
      accountNumber:new FormControl (""),
      education:new FormControl (""),
      religion:new FormControl (""),
      admitted:new FormControl (""),
      rsaPin:new FormControl (""),
    })
    this.isProposal = data.isProposal
    if(this.isProposal){
      this.clientForm.patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  submitClient(){
    this.spinner.show();
    this.mockService.getClients().subscribe(
      (res:any)=>{
        const lastID = res[res.length - 1].id
        let newID = lastID + 1;
        let payload = this.clientForm.value;
        payload.id = newID;

        setTimeout(() => {
          this.mockService.createClient(payload).subscribe(
            (res:any)=>{
              this.spinner.hide();
              this.dialogRef.close(payload);
              this.toastr.success('Client Created');
            },(err:HttpErrorResponse)=>{
              this.toastr.error(err.message);
              this.spinner.hide();
            }
          );
        }, 1500);
      }
    )
    
  }
  sanctionCheck(){
    this.spinner.show();
    setTimeout(() => {
      this.isSanctioned = true;
      this.spinner.hide();
      this.toastr.success('Client Passed Sanction Check')
    }, 1500);
  }
  validatePep(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success('Client Passed PEP Check')
      this.dialogRef.close(this.data);
    }, 1500);
  }

}
