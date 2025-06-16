import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-beneficiary',
  templateUrl: './create-beneficiary.component.html',
  styleUrls: ['./create-beneficiary.component.scss']
})
export class CreateBeneficiaryComponent implements OnInit {

  currentDate:Date = new Date();
  minBeneficiaryAge:Date = new Date(0);
  beneficiaryForm:FormGroup;
  bool = [
    {
      name: 'Yes',
      value: 'Y'
    },
    {
      name: 'No',
      value: 'N'
    }
  ]
  constructor() { 
    this.beneficiaryForm = new FormGroup({
      surname:new FormControl (""),
      otherNames:new FormControl (""),
      dob:new FormControl (""),
      inputPercentage:new FormControl (""),
      relation:new FormControl (""),
      phoneNumber:new FormControl (""),
      email:new FormControl (""),
      isMinor:new FormControl (""),
      guardianSurname:new FormControl (""),
      guradianOtherNames:new FormControl (""),
      guardiandob:new FormControl (""),
      guardianPhoneNumber:new FormControl (""),
      guradianEmail:new FormControl (""),
    })
  }

  ngOnInit(): void {
  }

  getBeneficiaryAge(){
    let benAge = this.beneficiaryForm.value.dob;
    const startYear = benAge.getFullYear();
    const endYear = this.currentDate.getFullYear();
    const endMonth = this.currentDate.getMonth();
    const endDay = this.currentDate.toString().substring(8,10);
    const day = Number(endDay)
    const legalYear =  endYear - 18;
    this.minBeneficiaryAge = new Date(legalYear, endMonth, day);

    if(benAge > this.minBeneficiaryAge){
      this.beneficiaryForm.controls['isMinor'].setValue('Y');
    }else{
      this.beneficiaryForm.controls['isMinor'].setValue('N');
    }
  }

}
