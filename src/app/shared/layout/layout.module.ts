
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { GenarateReceiptModule } from 'src/app/module/genarate-receipt/genarate-receipt.module';
import { ReceivablePostingModule } from '../../payable-receivable/receivable-posting/receivable-posting.module';


@NgModule({
  declarations: [
    LayoutComponent,
    MenuIconComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenarateReceiptModule,
    ReceivablePostingModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
