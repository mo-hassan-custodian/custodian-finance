import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './shared/layout/layout.component';
import { MenuIconComponent } from './shared/menu-icon/menu-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { AuthguardService } from './services/authguard/authguard.service';
import { SessionService } from './services/session/session.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule } from '@angular/material/stepper';
import { ClaimsBookingComponent } from './pages/home/claims-booking/claims-booking.component';
import { ClientSetupComponent } from './pages/Client/client-setup/client-setup.component';
import { AllCLientsComponent } from './pages/Client/all-clients/all-clients.component';
import { ProposalComponent } from './pages/Proposal/proposal/proposal.component';
import { DuplicateCheckComponent } from './pages/Proposal/proposal/DuplicateCheck/duplicate-check/duplicate-check.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BeneficiaryTableComponent } from './pages/Beneficiary/beneficiary-table/beneficiary-table.component';
import { CreateBeneficiaryComponent } from './pages/Beneficiary/createBeneficiary/create-beneficiary/create-beneficiary.component';
import { KycTableComponent } from './pages/KYC/KYC Table/kyc-table/kyc-table.component';
import { KycCreationComponent } from './pages/KYC/KYC Table/KYC creation/kyc-creation/kyc-creation.component';
import { ConvertToProposalComponent } from './pages/ConvertToProposal/convert-to-proposal/convert-to-proposal.component';
import { SharedModalComponent } from './shared/SearchModal/shared-modal/shared-modal.component';
import { AuthorizeProposalsModule } from 'projects/authorize-proposals/src/public-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    MenuIconComponent,
    ClaimsBookingComponent,
    ClientSetupComponent,
    AllCLientsComponent,
    ProposalComponent,
    DuplicateCheckComponent,
    BeneficiaryTableComponent,
    CreateBeneficiaryComponent,
    KycTableComponent,
    KycCreationComponent,
    ConvertToProposalComponent,
    SharedModalComponent
  ],
  imports: [
    AuthorizeProposalsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
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
    CommonModule,
    MatStepperModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true
    }),
  ],
  providers: [DatePipe,AuthguardService,SessionService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
