import { Component, OnInit } from '@angular/core';
import { ViewDetailsService } from "./view-details.service";
import { FlightBooking } from '../shared/FlightBooking';
import { Flights } from '../shared/Flight';
import { Bookings } from '../shared/Bookings';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
  providers: [ViewDetailsService]
})
export class ViewDetailsComponent implements OnInit {
  custId: string;
  flightId: string;
  bookings: Bookings[]=[];
  flightDetails: FlightBooking[];

  errorMessage: String;
  flights: Flights[];

  constructor(private viewdetailsservice: ViewDetailsService) { }

  ngOnInit() {
    this.viewAllBookings()
    // console.log(this.bookings)
  }


  viewAllBookings() {
    // implement the viewAllBookings method by invoking the view method of ViewDetailsService
    // and correspondingly populate flightDetails and errorMessage 
    this.viewdetailsservice.view().subscribe((success)=>{
      this.flightDetails=success
      // console.log(this.flightDetails)
      this.flightDetails.forEach((flight)=>{
        // console.log(flight.bookings)
        flight.bookings.forEach((element) => {
          // console.log(element)
          element.flightId=flight.flightId
          this.bookings.push(element)
        });
      })
    },
    (error)=>{
      this.errorMessage=error.error.message
    })
}
}