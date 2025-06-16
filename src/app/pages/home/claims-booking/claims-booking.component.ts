import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-claims-booking',
  templateUrl: './claims-booking.component.html',
  styleUrls: ['./claims-booking.component.scss']
})
export class ClaimsBookingComponent implements OnInit {

  claimsBooking:FormGroup;

  constructor() {
    this.claimsBooking = new FormGroup ({
      policyNumber:new FormControl ("",[Validators.required, Validators.pattern(/^(?!http:\/\/|https:\/\/)(?!.*<script).*$/)]),

    })
  }

  ngOnInit(): void {
  }

}