import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'src/app/servicesUI/cookie.service';
import { DataService } from 'src/app/servicesDB/data.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  avtarLabel!: string;
  logonForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LogonComponent>,
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _dataService: DataService,
  ) { }


  ngOnInit(): void {

    // Logon form values
    this.logonForm = this._formBuilder.group({
      "user_name": new FormControl(''),
      "user_country": new FormControl('')
    })
  }

  logon_submit() {
    console.log(this.logonForm.controls['user_name'].value);

    // localStorage.setItem('user_name',this.logonForm.controls['user_name'].value);
    // localStorage.setItem('user_country',this.logonForm.controls['user_country'].value);

    // create new record
    let reqObj = {
      "user_name": this.logonForm.controls['user_name'].value,
      "user_country": this.logonForm.controls['user_country'].value,
      "user_agent": window.navigator.userAgent,
      "client_lang": window.navigator.language,
    }

    this._dataService.saveuser(reqObj).subscribe({
      complete: () => {
        // console.log("Ok Added in db");
        localStorage.setItem('user_name',this.logonForm.controls['user_name'].value);
        localStorage.setItem('user_country',this.logonForm.controls['user_country'].value);
      },
      error: () => {
        console.log("not ok");
      }
    })

    // store in storage
  }

  selected_avtar(avtarStr: string) {
    this.avtarLabel = avtarStr;
    // console.log("btn",this.avtarLabel);
  }

}
