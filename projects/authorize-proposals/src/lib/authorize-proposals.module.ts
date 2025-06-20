import { NgModule } from '@angular/core';
import { AuthorizeProposalsComponent } from './authorize-proposals.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { AuthorizeProposalsRoutingModule } from './authorize-proposals-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms'
import { NgbModule, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { RenewalComponent } from './renewalcomponent/renewal/renewal.component';
import { RenewalDetailsComponent } from './renewalcomponent/renewal-details/renewal-details.component';
import { RateSetupComponent } from './ratesetup/rate-setup/rate-setup.component';
import { CreateRequisitionComponent } from './requisitions-component/create-requisition/create-requisition.component';
import { SetupPaymentsComponent } from './payments-component/setup-payments/setup-payments.component';
import { PayeeModalComponent } from './components/payee-modal/payee-modal.component';





@NgModule({
  declarations: [
    AuthorizeProposalsComponent,
    ProposalsComponent,
    ProposalDetailsComponent,
    PremiumCardComponent,
    RenewalComponent,
    RenewalDetailsComponent,
    RateSetupComponent,
    CreateRequisitionComponent,
    SetupPaymentsComponent,
    PayeeModalComponent
  ],
  imports: [
    CommonModule,
    AuthorizeProposalsRoutingModule,
    BrowserModule,
    MatTabsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        NgbModule,
        MatSidenavModule,
        MatExpansionModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatMenuModule,
        MatExpansionModule,
        MatButtonModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCardModule,
        MatSelectModule,
        MatRippleModule,
        MatMenuModule,
        FormsModule,
        MatStepperModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          preventDuplicates: true
        }),
  ],
  exports: [
    AuthorizeProposalsComponent,
    ProposalsComponent,
    ProposalDetailsComponent,
    PayeeModalComponent
  ],
  providers: [NgbActiveModal],
})
export class AuthorizeProposalsModule { }
