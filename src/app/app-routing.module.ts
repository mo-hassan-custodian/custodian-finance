import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ClientSetupComponent } from './pages/Client/client-setup/client-setup.component';
import { AllCLientsComponent } from './pages/Client/all-clients/all-clients.component';
import { ProposalComponent } from './pages/Proposal/proposal/proposal.component';
import { DuplicateCheckComponent } from './pages/Proposal/proposal/DuplicateCheck/duplicate-check/duplicate-check.component';
import { ConvertToProposalComponent } from './pages/ConvertToProposal/convert-to-proposal/convert-to-proposal.component';
import { ProposalsComponent } from 'projects/authorize-proposals/src/lib/proposals/proposals.component';
import { ProposalDetailsComponent } from 'projects/authorize-proposals/src/lib/proposal-details/proposal-details.component';
import { PremiumCardComponent } from 'projects/authorize-proposals/src/lib/premium-card/premium-card.component';
import { RenewalComponent } from 'projects/authorize-proposals/src/lib/renewalcomponent/renewal/renewal.component';
import { RenewalDetailsComponent } from 'projects/authorize-proposals/src/lib/renewalcomponent/renewal-details/renewal-details.component';
import { RateSetupComponent } from 'projects/authorize-proposals/src/lib/ratesetup/rate-setup/rate-setup.component';

const routes: Routes = [
  { path:"",redirectTo:"Home", pathMatch: 'full'},
  { path:"Home",  component:LayoutComponent, pathMatch:'full'},
  {
      path: 'App',
      component: LayoutComponent,
      children: [
        {path:'CreateCustomer',component:ClientSetupComponent},
        {path:'AllClients',component:AllCLientsComponent},
        // {path:'NewProposal',component:DuplicateCheckComponent},
        {path:'NewProposal',component:ProposalComponent}, 
        {path:'ConvertProposal',component:ConvertToProposalComponent},
        {path:'authorize-proposals',component:ProposalsComponent},
        {path:'proposal-details/:id',component:ProposalDetailsComponent},
        {path:'premium-card',component:PremiumCardComponent},
        {path:'renewal',component:RenewalComponent},
        {path:'renewal-details',component:RenewalDetailsComponent},
        {path:'rate-setup',component:RateSetupComponent},
      ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
