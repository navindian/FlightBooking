import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFlightComponent } from "./book-flight/book-flight.component";
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';


export const routes: Routes = [
{path:"book",component:BookFlightComponent},
{path:"view",component:ViewDetailsComponent},
{path:"updateBooking/:bookingId/:flightId",component:UpdateBookingComponent},
{path:"**",redirectTo:"book",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
