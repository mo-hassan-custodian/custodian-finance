import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposal } from '../proposal.model';
import { AuthorizeProposalsService } from '../authorize-proposals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css'],
})
export class ProposalDetailsComponent implements OnInit {
  myForm!: FormGroup;
  proposal: Proposal | undefined;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authorizeProposalsService: AuthorizeProposalsService,
    private modalService: NgbModal,
    private fb: FormBuilder, // Form builder for form validation and form initialization.
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Get the ID from the route
    this.loadProposal(id);
    this.initializeForm();
  }

  // Fetch proposal details by ID
  loadProposal(id: number): void {
    this.authorizeProposalsService.getProposalById(id).subscribe(
      (data: Proposal) => {
        this.proposal = data;
        this.isLoading = false;
        this.patchFormValues();
      },
      (error) => {
        console.error('Error fetching proposal:', error);
        this.isLoading = false;
        this.errorMessage =
          'Proposal not found. Please check the ID and try again.';
      }
    );
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      product: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      policyNumber: ['', Validators.required],
      proposalNumber: ['', Validators.required],
      referenceNo: ['', Validators.required],
      assured: ['', Validators.required],
      lifeAssured: ['', Validators.required],
      lifeClass: ['', Validators.required],
      occupation: ['', Validators.required],
      productOption: ['', Validators.required],
      premiumMask: ['', Validators.required],
      branch: ['', Validators.required],
      agent: ['', Validators.required],
      marketer: ['', Validators.required],
      paymentMode: ['', Validators.required],
      paymentFrequency: ['', Validators.required],
      term: ['', Validators.required],
      lifeRider: ['', Validators.required],
      coinsurance: ['', Validators.required],
      retirementAge: ['', Validators.required],
      lifeCoverFactor: ['', Validators.required],
      lapseTime: ['', Validators.required],
      returnToDate: ['', Validators.required],
      returnFromDate: ['', Validators.required],
      proposalSignDate: ['', Validators.required],
      submissionDate: ['', Validators.required],
    });
  }

  // Patch form values with proposal data
  patchFormValues(): void {
    if (this.proposal) {
      this.myForm.patchValue({
        product: this.proposal.product,
        effectiveDate: this.proposal.effectiveDate,
        policyNumber: this.proposal.policyNumber,
        proposalNumber: this.proposal.proposalNumber,
        assured: this.proposal.assured,
        lifeAssured: this.proposal.lifeAssured,
        occupation: this.proposal.occupation,
        productOption: this.proposal.productOption,
        premiumMask: this.proposal.premiumMask,
        branch: this.proposal.branch,
        agent: this.proposal.agent,
        marketer: this.proposal.marketer,
        // Add other fields as needed
      });
    }
  }

  openModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      size: 'lg', // Adjust the size as needed
    });
  }

  // Open the verify allocation modal
  openVerifyModal(verifycontent: any) {
    this.modalService.open(verifycontent, {
      centered: true,
      backdrop: 'static',
      size: 'lg', // Adjust the size as needed
    });
  }

  goBack() {
    this.location.back();
  }
}
