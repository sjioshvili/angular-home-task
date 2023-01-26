import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  constructor() {}

  date_TO_String(date_Object: Date): string {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    let date_String: string =
      date_Object.getDate() +
      '/' +
      date_Object.getMonth() +
      '/' +
      +date_Object.getFullYear() +
      ' ' +
      +date_Object.getHours() +
      ':' +
      +date_Object.getMinutes();
    return date_String;
  }
}
