import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateBookingService } from './update-booking.service';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private updateBookingServ: UpdateBookingService) {
  }
  bookingId: number;
  flightId: string;
  successMessage: string;
  errorMessage: string;
  updateBookingForm: FormGroup;

  ngOnInit() {
  //  obtain the route parameters here
  // code the updateBookingForm with mentioned requirements
  this.route.params.subscribe((success)=>{
    this.bookingId=success["bookingId"]
    this.flightId=success["flightId"]
  })
  this.updateBookingForm=this.fb.group(
    {bookingId:[{value:this.bookingId,disabled:true},[Validators.required,Validators.min(2001)]],
    noOfTickets:["",[Validators.required,Validators.min(1)]],
    flightId:[{value:this.flightId,disabled:true},[Validators.required]]
  }
  )
  }

  updateBooking() {
    // implement the updateBooking method by invoking the updateBooking method of UpdateBookingService
    // and correspondingly populate errorMessage and successMessage 
    this.successMessage=null;
    this.errorMessage=null;
    this.updateBookingForm.value.bookingId=this.bookingId
    this.updateBookingForm.value.flightId=this.flightId
    this.updateBookingServ.updateBooking(this.updateBookingForm.value).subscribe((success)=>{
      this.successMessage=success.message
    },(error)=>{
      this.errorMessage=error.error.message
    })
  }
}

