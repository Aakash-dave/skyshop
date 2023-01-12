import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'src/app/servicesUI/cookie.service';
import { DataService } from 'src/app/servicesDB/data.service';
import { MatDialog } from '@angular/material/dialog';

interface USERDATA {
  "user_name": string,
  "user_country": string,
  "user_agent": string,
  "client_lang": string,
}

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
    private _dialogRef: MatDialog
  ) { }


  ngOnInit(): void {

    // Logon form values
    this.logonForm = this._formBuilder.group({
      "user_name": new FormControl(''),
      "user_country": new FormControl('')
    })

  }

  logon_submit() {
    // create new record
    let reqObj: USERDATA = this.userData();
    this.storeUserData(reqObj, true);
  }

  selected_avtar(avtarStr: string) {
    this.avtarLabel = avtarStr;
  }

  avatarLogin() {
    let reqObj: USERDATA = this.userData();
    reqObj.user_name = this.avtarLabel;
    reqObj.user_country = 'UNKNOWN';
    this.storeUserData(reqObj, false);
  }


  userData() {
    const user_name_val = this.logonForm.controls['user_name'].value;
    const user_country_val = this.logonForm.controls['user_country'].value;

    let reqObj: USERDATA = {
      "user_name": user_name_val,
      "user_country": user_country_val,
      "user_agent": window.navigator.userAgent,
      "client_lang": window.navigator.language,
    }
    return reqObj;
  }

  storeUserData(inputObj: USERDATA, needLocalStore: boolean) {
    this._dataService.saveuser(inputObj).subscribe({
      complete: () => {

        if (needLocalStore) {
          localStorage.setItem('user_name', inputObj.user_name);
          localStorage.setItem('user_country', inputObj.user_country);
        }

        this._dataService.user_name.next([inputObj.user_name, inputObj.user_country]);
        this._dialogRef.closeAll();
      },
      error: (error) => {
        console.log("not ok");
        console.log(error);
      }
    })
  }


}
