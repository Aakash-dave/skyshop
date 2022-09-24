import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  AvtarLabel$!: string;
  logonForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<LogonComponent>,
    private _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    
          // Logon form values
          this.logonForm = this._formBuilder.group({
            "user_full_name" : new FormControl(''),
            "user_country" : new FormControl('')
          })

  }

  Logon_submit() {
    console.log(this.logonForm.controls['user_full_name'].value);

    // fetch login if already in database

    // else create new
  }

  selected_avtar(avtarStr: string) {
    this.AvtarLabel$ = avtarStr;
    // console.log("btn",this.AvtarLabel$);
  }

}
