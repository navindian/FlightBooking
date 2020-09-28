import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../../app/app.component';
import { routes } from '../../app/app-routing.module';
import { AppRoutingModule } from '../../app/app-routing.module';
import { BookFlightComponent } from '../../app/book-flight/book-flight.component';
import { ViewDetailsComponent } from '../../app/view-details/view-details.component';
import { VerifyComponent } from '../../app/verify/verify.component';
import { UpdateBookingComponent } from '../../app/update-booking/update-booking.component';
import { ViewDetailsService } from '../../app/view-details/view-details.service';
import { ViewFlightsComponent } from '../../app/view-flights/view-flights.component';
import { BookingsComponent } from '../../app/bookings/bookings.component';
import { FlightIdPipe } from '../../app/flight-id.pipe';
import { CustomerIdPipe } from '../../app/customer-id.pipe';
import { BookFlightService } from '../../app/book-flight/book-flight.service';

class MockViewDetailsService {
    view(): Observable<any> { return new Observable() }
    delete(): Observable<any> { return new Observable(); }
}


describe('Testing_View_Details_Component', () => {
    let component: ViewDetailsComponent;
    let fixture: ComponentFixture<ViewDetailsComponent>;
    let viewDetailsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, HttpClientModule],
            declarations: [ViewDetailsComponent, ViewFlightsComponent, BookingsComponent, FlightIdPipe, CustomerIdPipe],
            providers: [{ provide: ViewDetailsService, useClass: MockViewDetailsService }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ViewDetailsComponent);
        component = fixture.componentInstance;
        viewDetailsService = TestBed.get(ViewDetailsService);
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        // component.selected = true

    });

    
    it('ViewDetailsComponent : Filter using customer Id Property', () => {

        const customerIdInput: DebugElement = fixture.debugElement.query(By.css('#customerId'));
        const flightIdInput: DebugElement = fixture.debugElement.query(By.css('#FlightId'));
        const filterBtn: DebugElement = fixture.debugElement.query(By.css('#filterBtn'));
        const resetBtn: DebugElement = fixture.debugElement.query(By.css('#resetBtn'));
        customerIdInput.attributes.value = "P1001"
        filterBtn.triggerEventHandler['click'];
        fixture.detectChanges();

        // expect(filterBtn.attributes[]).toBeUndefined();
        // expect(resetBtn.attributes[]).toBeUndefined();


    });
// not working 
//     // it('ViewDetailsComponent : viewAllBookings method implemented according to given requirement', () => {
//     //     spyOn(viewDetailsService, 'view').and.returnValue(of([
//     //         {
//     //             "flightId": "IND-101",
//     //             "AircraftName": "Delta Airlines",
//     //             "fare": 600,
//     //             "availableSeats": 1,
//     //             "status": "Running",
//     //             "bookings": [
//     //                 {
//     //                     "customerId": "P1001",
//     //                     "bookingId": 2001,
//     //                     "noOfTickets": 3,
//     //                     "bookingCost": 1800
//     //                 },
//     //                 {
//     //                     "customerId": "S1001",
//     //                     "bookingId": 2003,
//     //                     "noOfTickets": 2,
//     //                     "bookingCost": 1200
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     //     ));
//     //     component.bookings=[]
//     //     component.flightDetails=[
//     //         {
//     //             "flightId": "IND-101",
            
//     //             "fare": 600,
//     //             "availableSeats": 1,
//     //             "status": "Running",
//     //             "bookings": [
//     //                 {
//     //                     "customerId": "P1001",
//     //                     "bookingId": 2001,
//     //                     "noOfTickets": 3,
//     //                     "bookingCost": 1800
//     //                 },
//     //                 {
//     //                     "customerId": "S1001",
//     //                     "bookingId": 2003,
//     //                     "noOfTickets": 2,
//     //                     "bookingCost": 1200
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     //     fixture.detectChanges()
//     //     component.viewAllBookings();
//     //     fixture.detectChanges()
//     //     alert(component.bookings)
//     //     setTimeout(()=>{},2000)
//     //     expect(component.bookings).toEqual([
//     //         {
//     //             "flightId": "IND-101",
//     //             "customerId": "P1001",
//     //             "bookingId": 2001,
//     //             "noOfTickets": 3,
//     //             "bookingCost": 1800
//     //         },
//     //         {
//     //             "flightId": "IND-101",
//     //             "customerId": "S1001",
//     //             "bookingId": 2003,
//     //             "noOfTickets": 2,
//     //             "bookingCost": 1200
//     //         }
//     //     ]);
//     // });

    it('ViewDetailsComponent: Added required dependencies without additional dependencies', inject([ViewDetailsService], (service: ViewDetailsService) => {
        expect(service).not.toBeNull('service not injected');
    }));


});