import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { HttpClientModule } from "@angular/common/http";
import { ViewDetailsComponent } from './view-details/view-details.component';
import { VerifyComponent } from './verify/verify.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { ViewDetailsService } from './view-details/view-details.service';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FlightIdPipe } from './flight-id.pipe';
import { CustomerIdPipe } from './customer-id.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BookFlightComponent,
    ViewDetailsComponent,
    VerifyComponent,
    UpdateBookingComponent,
    ViewFlightsComponent,
    BookingsComponent,
    FlightIdPipe,
    CustomerIdPipe  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, FormsModule,

  ],
  providers: [ ViewDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
