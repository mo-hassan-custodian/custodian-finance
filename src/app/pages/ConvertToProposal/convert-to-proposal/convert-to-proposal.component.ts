import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientSetupComponent } from '../../Client/client-setup/client-setup.component';

@Component({
  selector: 'app-convert-to-proposal',
  templateUrl: './convert-to-proposal.component.html',
  styleUrls: ['./convert-to-proposal.component.scss']
})
export class ConvertToProposalComponent implements OnInit {
  
  proposalForm: FormGroup;
  Bool:any[]= [
    {
      name: 'YES',
      value: 'Y'
    },
    {
      name: 'NO',
      value: 'N'
    },
  ]

  constructor() { 
    this.proposalForm = new FormGroup ({
      proposalNumber:new FormControl (""),
      effectiveDate:new FormControl (""),
      assured:new FormControl (""),
      product :new FormControl (""),
      term :new FormControl (""),
      lifeRider:new FormControl (""),
      lifeCoverFactor:new FormControl (""),
      jointProposal:new FormControl (""),
      isAssuredSame:new FormControl (""),
      lifeAssured:new FormControl (""),
      monthlyIncome:new FormControl (""),
      status:new FormControl (""),
      newEffectiveDate:new FormControl (""),
      productOption:new FormControl (""),
      frequencyOfPayment:new FormControl (""),
      childAge:new FormControl (""),
      sumAssured:new FormControl (""),
      coinsured:new FormControl (""),
      coinsuranceLeader:new FormControl (""),
      refNum:new FormControl ("")
    })
  }

  ngOnInit(): void {
  }

  searchProposal(){

  }

}
