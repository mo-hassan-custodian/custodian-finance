import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from 'src/app/model/dialog-data';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { SharedModalComponent } from 'src/app/shared/SearchModal/shared-modal/shared-modal.component';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  firstFormGroup:FormGroup;
  selectedClient:any = '';
  @ViewChild('stepper') stepper!: any;

  constructor(public mockService:MockServiceService, public dialog: MatDialog,public toastr:ToastrService ) {
    this.firstFormGroup = new FormGroup({
      branch:new FormControl (""),
      product:new FormControl (""),
      agent:new FormControl (""),
      client:new FormControl (""),
      paymentFrequency:new FormControl (""),
      term:new FormControl (""),
      sumAssured:new FormControl (""),
      proposalDate:new FormControl (""),
      inputProposal:new FormControl (1),
    })
   }

  ngOnInit(): void {
  }

  nextStepper(client:any){
    this.stepper.next();
    this.selectedClient = client;
    this.firstFormGroup.get('client')?.patchValue(client.surname +' '+ client.otherNames);
    this.firstFormGroup.patchValue(client);
  }
  searchAgent(){
    let data:any = {
      Url: 'Agents',
      label: 'Agent'
    }
    const dialogRef = this.dialog.open(SharedModalComponent,{
      width:'70%',
      height:'70%',
      data:data,   
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.firstFormGroup.get('agent')?.patchValue(result.name);
      } else {
        this.toastr.error('Unable to retreive Agent')
      }
    });
  }


}
