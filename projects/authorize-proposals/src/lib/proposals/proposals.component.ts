import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthorizeProposalsService } from '../authorize-proposals.service';
import { Proposal } from '../proposal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-proposal',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalsComponent implements OnInit {
  headers = [
    'PolicyNumber',
    'Name',
    'Product',
    'Occupation',
    'Number',
    'DOB',
    'action',
  ];
  dataSource = new MatTableDataSource<Proposal>();
  searchForm: FormGroup;
  searched: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authorizeProposalsService: AuthorizeProposalsService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      policyNumber: new FormControl(''),
      proposalNumber: new FormControl(''),
      enddate: new FormControl(''),
      surname: new FormControl(''),
      otherNames: new FormControl(''),
      startDate: new FormControl(''),
      number: new FormControl(''),
      product: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadProposals();
  }

  // Load all proposals
  loadProposals(): void {
    this.authorizeProposalsService.getProposals().subscribe(
      (data: Proposal[]) => {
        this.dataSource.data = data; // Assign the array of proposals to the dataSource
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error loading proposals:', error);
      }
    );
  }

  // Search proposals based on form values
  search(): void {
    const params = this.searchForm.value;

    // Remove empty or null parameters
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    this.authorizeProposalsService.searchProposals(params).subscribe(
      (data: any[]) => {
        this.dataSource.data = data; // Assign the filtered proposals to the dataSource
        this.dataSource.paginator = this.paginator;
        this.searched = true;
      },
      (error: any) => {
        console.error('Error searching proposals:', error);
      }
    );
  }

  // Navigate to proposal details
  // navigateToProposalDetails(element: Proposal): void {
  //   this.authorizeProposalsService.getProposalById(element.id).subscribe(
  //     (data: any) => {
  //       console.log('Proposal Details:', data);
  //       // Navigate to the details page or open a modal
  //     },
  //     (error: any) => {
  //       console.error('Error fetching proposal details:', error);
  //     }
  //   );
  // }

  navigateToProposalDetails(proposalId: number) {
    this.router.navigate(['/App/proposal-details', proposalId]);
  }
}
