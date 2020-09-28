import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable,of, throwError} from 'rxjs';
import { ViewDetailsService } from '../view-details/view-details.service';
import {ViewFlightsComponent} from '../view-flights/view-flights.component';


class ViewDetailsServiceStub {
    view() { return new Observable() }
    delete(bookingId) { return new Observable() }
}

describe('ViewFlightsComponent : Testing delete Method', () => {
    let component: ViewFlightsComponent;
    let fixture: ComponentFixture<ViewFlightsComponent>;
    let viewDetailsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [ViewFlightsComponent],
            providers: [{ provide: ViewDetailsService, useClass: ViewDetailsServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewFlightsComponent);
        component = fixture.componentInstance;
        viewDetailsService = TestBed.get(ViewDetailsService);
        component.flightDetails = [
            {
                flightId: "IND-101",
                aircraftName: "Delta Airlines",
                fare: 600, availableSeats: 1,
                status: "Running",
                bookings: [
                    { customerId: "P1001", bookingId: 2001, noOfTickets: 3, bookingCost: 1800 },
                    { customerId: "S1001", bookingId: 2003, noOfTickets: 2, bookingCost: 1200 }]
            }]


        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2
    });

    it('TVFC 1 - ViewFlights : Component should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('TVFC 2 - ViewFlights : Should invoke getAllFlights() method of viewDetailsService', () => {
        let newflightDetails = [
                    {
                        flightId: "IND-101",
                        aircraftName: "Delta Airlines",
                        fare: 600, availableSeats: 1,
                        status: "Running",
                        ViewFlights: [
                            { customerId: "P1001", bookingId: 2001, noOfTickets: 3, bookingCost: 1800 },
                            { customerId: "S1001", bookingId: 2003, noOfTickets: 2, bookingCost: 1200 }]
                    }]
        let spy = spyOn(viewDetailsService, 'view').and.returnValue(of(newflightDetails));
        component.getAllFlights();
        fixture.detectChanges();
        fixture.whenStable().then(data => {
            expect(spy).toHaveBeenCalled();
        })
    });

    it('TVFC 3 - ViewFlights : Should populate flight details into flightDetails property', () => {
        let spy = spyOn(viewDetailsService, 'view').and.returnValue(of(component.flightDetails));
        let newflightDetails = [
            {
                flightId: "IND-101",
                aircraftName: "Delta Airlines",
                fare: 600, availableSeats: 1,
                status: "Running",
                bookings: [
                    { customerId: "P1001", bookingId: 2001, noOfTickets: 3, bookingCost: 1800 },
                    { customerId: "S1001", bookingId: 2003, noOfTickets: 2, bookingCost: 1200 }]
            }]
        component.getAllFlights();
        fixture.detectChanges();
        expect(component.flightDetails).toEqual(newflightDetails)
    });

    it('TVFC 4 - ViewFlights : Should populate error message into errorMessage property', () => {
        let spy = spyOn(viewDetailsService, 'view').and.returnValue(throwError({ error: { message: "Failed to load all flights" } }));
        // expect(component.errorMessage).toBe(undefined);
        component.getAllFlights();
        fixture.detectChanges();
        expect(component.errorMessage).toBe('Failed to load all flights');
    });

    it('TVFC 5 - ViewFlights : errorMessage property should be null in success case', () => {
        spyOn(viewDetailsService, 'view').and.returnValue(of(component.flightDetails));
        component.getAllFlights();
        fixture.detectChanges();
        expect(component.errorMessage).toEqual(null);
    });

    it('TVFC 6 - ViewFlights : flightDetails property should be null in error case', () => {
        component.flightDetails=null
        spyOn(viewDetailsService, 'view').and.returnValue(throwError({ error: { message: "error occured" } }));
        component.getAllFlights();
        fixture.detectChanges();
        expect(component.flightDetails).toEqual(null);
    });


})


// describe('ViewFlightsComponent : Testing delete Method', () => {
//     let component: ViewFlightsComponent;
//     let fixture: ComponentFixture<ViewFlightsComponent>;
//     let viewDetailsService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
//             declarations: [ViewFlightsComponent],
//             providers: [{ provide: ViewDetailsService, useClass: ViewDetailsServiceStub }]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ViewFlightsComponent);
//         component = fixture.componentInstance;
//         viewDetailsService = TestBed.get(ViewDetailsService);
//         let flight =
//             {
//                 flightId: "IND-101",
//                 aircraftName: "Delta Airlines",
//                 fare: 600, availableSeats: 1,
//                 status: "Running",
//                 bookings: [
//                     { customerId: "P1001", bookingId: 2001, noOfTickets: 3, bookingCost: 1800 },
//                     { customerId: "S1001", bookingId: 2003, noOfTickets: 2, bookingCost: 1200 }]
//             }


//         fixture.detectChanges();
//         jasmine.MAX_PRETTY_PRINT_DEPTH = 2
//     });


//     it('TVFC 7 - ViewFlights : Should invoke sendFlightData(flight) method of viewDetailsService', () => {
//         let flight =
//         {
//             flightId: "IND-101",
//             aircraftName: "Delta Airlines",
//             fare: 600, availableSeats: 1,
//             status: "Running",
//             bookings: [
//                 { customerId: "P1001", bookingId: 2001, noOfTickets: 3, bookingCost: 1800 },
//                 { customerId: "S1001", bookingId: 2003, noOfTickets: 2, bookingCost: 1200 }]
//         }
//         component.sendFlightData(flight)
//         fixture.detectChanges()
//         expect(flight.flightId).toBe("IND-101")
//         expect(flight.aircraftName).toBe("Delta Airlines")
//     });

// })

