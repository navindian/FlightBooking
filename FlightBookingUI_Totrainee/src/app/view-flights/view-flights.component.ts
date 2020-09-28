import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewDetailsService } from "../view-details/view-details.service";
import { FlightBooking } from '../shared/FlightBooking'

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})

export class ViewFlightsComponent implements OnInit {
  // flightDetails: FlightBooking[]
  flightDetails;
  @Output() flightToEmit = new EventEmitter();
  imageUrl = ["../../assets/a1.jpg", "../../assets/a2.jpg", "../../assets/a3.jpg"];
  errorMessage = null;
  constructor(private viewService: ViewDetailsService) { }

  ngOnInit() {
    this.getAllFlights()
  }

  getAllFlights() {
// implement the getAllFlights method by invoking the view method of ViewDetailsService
    // and correspondingly populate flightDetails and errorMessage 
    this.viewService.view().subscribe((success)=>{
      console.log(success)
      this.flightDetails=success},
    (err)=>{this.errorMessage=err.message})
  }

  sendFlightData(flight) {
    // emit the flight object using the flightToEmit event
    this.flightToEmit.emit(flight)
  }

}
