import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightBooking } from '../shared/FlightBooking';


@Injectable()
export class BookFlightService {

  errorMessage: String;
  url = "http://localhost:1050/bookFlight"
  constructor(private http: HttpClient) { }

  bookFlight(formData: any): Observable<any> {
    //make an http post call with the given url by passing the formData
    return this.http.post<any>(this.url,formData)
  }
}
