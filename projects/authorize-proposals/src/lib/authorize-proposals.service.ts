import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from './proposal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeProposalsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch all proposals
  getProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.apiUrl}/proposals`);
  }

  // Search proposals by parameters
  searchProposals(params: any): Observable<Proposal[]> {
    let httpParams = new HttpParams({ fromObject: params });
    return this.http.get<Proposal[]>(`${this.apiUrl}/proposals`, {
      params: httpParams,
    });
  }

  // Fetch a single proposal by ID
  getProposalById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.apiUrl}/proposals/${id}`);
  }
}
