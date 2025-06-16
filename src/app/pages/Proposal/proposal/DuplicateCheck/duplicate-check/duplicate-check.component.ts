import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AllCLientsComponent } from 'src/app/pages/Client/all-clients/all-clients.component';

@Component({
  selector: 'app-duplicate-check',
  templateUrl: './duplicate-check.component.html',
  styleUrls: ['./duplicate-check.component.scss']
})
export class DuplicateCheckComponent implements OnInit {

  info = {

  }
  private dialogRef!: MatDialogRef<any>;
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openClient(){
    // this.dialog.open(AllCLientsComponent)
    this.dialogRef = this.dialog.open(AllCLientsComponent,{
      width:'65%',
      height:'80%',
      data:this.info   
    });
  }

}
