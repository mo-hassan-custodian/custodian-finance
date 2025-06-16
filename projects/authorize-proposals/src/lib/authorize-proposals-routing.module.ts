import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { RenewalComponent } from './renewalcomponent/renewal/renewal.component';
const routes: Routes = [
  // { path: 'authorize-proposals', component: ProposalsComponent },
  // { path: 'proposal-details', component: ProposalDetailsComponent },
  // { path: 'premium-card', component: PremiumCardComponent },
  // { path: 'renewal', component: RenewalComponent }
  { path: 'proposal-details/:id', component: ProposalDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizeProposalsRoutingModule {}
