import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightBooking } from '../shared/FlightBooking';
import { Observable } from 'rxjs';

@Injectable()
export class ViewDetailsService {

  booking: Observable<FlightBooking[]>
url1 = "http://localhost:1050/getAllBookings"
url2 = "http://localhost:1050/delete/"
  constructor(private http: HttpClient) {
  }

  view(): Observable<FlightBooking[]> {
        //make an http get call with the given url1
    return this.http.get<FlightBooking[]>(this.url1)
  }

  delete(bookingId): Observable<any> {
        //make an http delete call with the given url by passing the bookingId
    return this.http.delete<any>(this.url2+bookingId)
  }
}
