import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';
@Injectable({
  providedIn: 'root'
})
export class UpdateBookingService {

  constructor(private http: HttpClient) { }

  updateBooking(formData): Observable<any> {
    //make an http put call with the given url by passing the bookingId of the formData and also the formData 

    return this.http.put("http://localhost:1050/updateBooking/"+formData.bookingId,formData)
  }
}
