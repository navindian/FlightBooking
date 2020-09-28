import { Component, OnInit, Input } from '@angular/core';
import { ViewDetailsService } from "../view-details/view-details.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  @Input() bookingDetails;
  successMessage=null
  errorMessage=null
  constructor(private viewdetailsservice: ViewDetailsService, private router: Router) { }

  ngOnInit() { 
    console.log(this.bookingDetails)
  }

  delete(bookingId) {
    this.successMessage=null;
    this.errorMessage=null;
    // implement the delete method by invoking the delete method of ViewDetailsService
    // and correspondingly populate errorMessage, successMessage and bookingDetails
    this.viewdetailsservice.delete(bookingId).subscribe((element)=>{
      this.successMessage=element.message
      this.bookingDetails=this.bookingDetails.filter((data)=>{
        return data.bookingId !=bookingId
      })
    },(error)=>{
      this.errorMessage=error.error.message
    })
  }

  updateBooking(booking) {
// use the router instance and navigate to UpdateComponent 
// by passing bookingId and flightId og booking object
    this.router.navigate(["/updateBooking",booking.bookingId,booking.flightId])

  }

}
