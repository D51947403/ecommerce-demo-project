import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TamasEmartFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number):Observable<number[]>{
    let data:number[] =[];
    // build an array for "Month" drop down list
    // start at current month and loop untill 
    console.log('start month '+startMonth);
    for (let theMonth=startMonth; theMonth<=12 ;theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[] =[];
    // build an array for "Year" drop down list
    // --start at current year and loop untill next 10 years

    const startYear:number = new Date().getFullYear();
    const endYear:number =startYear+10;
    for (let theYear=startYear; theYear <=endYear ;theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
