import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ViewDetailsService } from '../view-details/view-details.service';
import { BookingsComponent } from '../bookings/bookings.component';
import { Router } from '@angular/router';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';

class ViewDetailsServiceStub {
    view() { return new Observable() }
    delete(bookingId) { return new Observable() }
}

describe('BookingsComponent : Testing delete Method', () => {
    let component: BookingsComponent;
    let fixture: ComponentFixture<BookingsComponent>;
    let viewDetailsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [BookingsComponent],
            providers: [{ provide: ViewDetailsService, useClass: ViewDetailsServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingsComponent);
        component = fixture.componentInstance;
        viewDetailsService = TestBed.get(ViewDetailsService);
        component.bookingDetails = [
            {
                _id: "5e0d6e0a2d05a82a186f6304",
                customerId: "S1001",
                bookingId: 2003,
                noOfTickets: 2,
                bookingCost: 1200,
                flightId: "IND-101"
            },
            {
                _id: "5e0d6e0a2d05a82a186f6308",
                customerId: "P1001",
                bookingId: 2002,
                noOfTickets: 3,
                bookingCost: 2250,
                flightId: "IND-102"
            }]
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2
    });
    it('TBC 1 -Bookings: component created',()=>{
        expect(component).toBeTruthy();

    })

    it('TBC 2 - Bookings : Should invoke delete() method of viewDetailsService', () => {
        let bookingId = 2002
        let spy = spyOn(viewDetailsService, 'delete').and.returnValue(of({ message: 'Success message is populated' }));
        component.delete(bookingId);
        fixture.detectChanges();
        fixture.whenStable().then(data => {
            expect(spy).toHaveBeenCalled();
        })
    });

    it('TBC 3 - Bookings : Should populate success message into successMessage property', () => {
        let spy = spyOn(viewDetailsService, 'delete').and.returnValue(of({ message: 'Success message is populated' }));
        let newbookingDetails = [{
            _id: "5e0d6e0a2d05a82a186f6304",
            customerId: "S1001",
            bookingId: 2003,
            noOfTickets: 2,
            bookingCost: 1200,
            flightId: "IND-101"
        }]
        expect(component.successMessage).toBe(null);
        component.delete(2002);
        fixture.detectChanges();
        expect(component.successMessage).toBe('Success message is populated');
        expect(component.bookingDetails).toEqual(newbookingDetails)
    });

    it('TBC 4 - Bookings : Should populate error message into errorMessage property', () => {
        let spy = spyOn(viewDetailsService, 'delete').and.returnValue(throwError({ error: { message: "Deletion failed" } }));
        expect(component.errorMessage).toBe(null);
        component.delete(2002);
        fixture.detectChanges();
        expect(component.errorMessage).toBe('Deletion failed');
    });

    it('TBC 5 - Bookings : errorMessage property should be null in success case', () => {
        spyOn(viewDetailsService, 'delete').and.returnValue(of({ message: "success message" }));
        component.delete(2002);
        
        fixture.detectChanges();
        expect(component.errorMessage).toEqual(null);
    });

    it('TPC 6 - Bookings : successMessage property should be null in error case', () => {
        spyOn(viewDetailsService, 'delete').and.returnValue(throwError({ error: { message: "error occured" } }));
        component.delete(2002);
        fixture.detectChanges();
        expect(component.successMessage).toEqual(null);
    });


})

// let router = {
//     navigate: jasmine.createSpy('navigate')
// }


//need to check
// describe('BookComponent - Testing update method', () => {
//     let component: BookingsComponent;
//     let fixture: ComponentFixture<BookingsComponent>;
//     let viewDetailsService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule.withRoutes([
//                 {
//                     path: 'updateBooking',
//                     component: UpdateBookingComponent
//                 }
//             ]), ReactiveFormsModule, HttpClientModule],
//             declarations: [BookingsComponent, UpdateBookingComponent],
//             providers: [{ provide: Router, useClass: router }]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(BookingsComponent);
//         component = fixture.componentInstance;
//         viewDetailsService = TestBed.get(Router);
//         component.bookingDetails = [
//             {
//                 _id: "5e0d6e0a2d05a82a186f6304",
//                 customerId: "S1001",
//                 bookingId: 2003,
//                 noOfTickets: 2,
//                 bookingCost: 1200,
//                 flightId: "IND-101"
//             },
//             {
//                 _id: "5e0d6e0a2d05a82a186f6308",
//                 customerId: "P1001",
//                 bookingId: 2002,
//                 noOfTickets: 3,
//                 bookingCost: 2250,
//                 flightId: "IND-102"
//             }]

//         fixture.detectChanges();
//         jasmine.MAX_PRETTY_PRINT_DEPTH = 2
//     });

//     // it('TBC 1 - Bookings : Component should call update function', () => {
//     //     let flight = {
//     //         customerId: "S1001",
//     //         bookingId: 2003,
//     //         noOfTickets: 2,
//     //         bookingCost: 1200,
//     //         flightId: "IND-101"
//     //     }
//     //     // alert(component.updateBooking(flight))
//     //     // component.updateBooking(flight)
//     //     // fixture.detectChanges();
//     //     // expect(router.navigate).toHaveBeenCalledWith(["/updateBooking/" + flight.bookingId + "/" + flight.flightId]);
//     // });

//     // it("TBC1 - TESTING", () => {
//     //     let flight = {
//     //         customerId: "S1001",
//     //         bookingId: 2003,
//     //         noOfTickets: 2,
//     //         bookingCost: 1200,
//     //         flightId: "IND-101"
//     //     }
//     // })
// })