import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }


  setCookie(key: string, value: string, expDays: number) {
    document.cookie = `${key}=${value}`; `max-age=${expDays * 24 * 60 * 60}`;
  }

  getCookie(key: string) {
    if (document.cookie.split(';').some((item) => item.trim().startsWith(key + '='))) {
      return true;
    }
    return false;
  }

  deleteCookie(key: string) {
    this.setCookie(key, '', 0);
  }

}
