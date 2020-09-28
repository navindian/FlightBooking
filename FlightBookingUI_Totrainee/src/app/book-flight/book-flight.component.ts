import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BookFlightService } from "./book-flight.service";


@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  providers: [BookFlightService]
})
export class BookFlightComponent implements OnInit {
  flightDetails
  errorMessage: String;
  successMessage: String;
  bookingForm: FormGroup

  constructor(private fb: FormBuilder, private bookFlightService: BookFlightService) { }

  ngOnInit() { }

  showForm(flight) {
    // populate flightDetails with flight
    this.flightDetails=flight

    //code the bookingForm with all mentioned validations
    this.bookingForm=this.fb.group({
      passengerName:["",[Validators.required,Validators.pattern(/^[A-z]+[A-z/s]+[A-z]$/)]],
      noOfTickets:["",[Validators.required,Validators.min(1)]],
      flightId:[{value:this.flightDetails.flightId,disabled:true}],
      customerId:["",[Validators.required,this.validateCustomerId]]
    })

  }

  book() {
    // implement the book method by invoking the bookFlight method of BookFlightService
    // and correspondingly populate errorMessage and successMessage 
    this.errorMessage=null;
    this.successMessage=null;
    this.bookingForm.value.flightId=this.flightDetails.flightId
    this.bookFlightService.bookFlight(this.bookingForm.value).subscribe((success)=>{
      this.successMessage=success.message
    },
    (error)=>{
      this.errorMessage=error.error.message
    })
  }

  validateCustomerId(c: FormControl) {
    // implement a custom validator to validate customerId and populate customerIdErr object with message 
    let customerId=c.value;
    if(!customerId.match(/^[A-z][1-9][0-9]{3}$/)){
      return {"customerIdErr":{message:"Enter a valid Customer Id (E.g., R1001)"}}
    }
  }
}



