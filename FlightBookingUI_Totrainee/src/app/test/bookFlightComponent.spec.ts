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
class MockBookFlightService {
    bookFlight(): Observable<any> { return new Observable(); }

}
class MockViewDetailsService {
    view(): Observable<any> { return new Observable() }
    delete(): Observable<any> { return new Observable(); }
}


describe('Testing_Book_Flight_Component', () => {
    let component: BookFlightComponent;
    let fixture: ComponentFixture<BookFlightComponent>;
    let bookFlightService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [BookFlightComponent, ViewFlightsComponent],
            providers: [{ provide: BookFlightService, useClass: MockBookFlightService }, { provide: ViewDetailsService, useClass: MockViewDetailsService }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BookFlightComponent);
        component = fixture.componentInstance;
        bookFlightService = TestBed.get(BookFlightService);
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        // component.selected = true
        component.flightDetails = { flightId: "IND-101" }
        component.showForm({ flightId: "IND-101" })
        fixture.detectChanges()
    });
    it('BookFlightComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('BookFlightComponent: Missing/Incorrect ids', () => {
        component.bookingForm.controls.passengerName.markAsDirty();
        component.bookingForm.controls.noOfTickets.markAsDirty();
        component.bookingForm.controls.flightId.markAsDirty();
        component.bookingForm.controls.customerId.markAsDirty();
        component.errorMessage=component.successMessage="message"
        fixture.detectChanges();
        const idList: string[] = ['successMessage', 'errorMessage', 'passengerNameError', 'noOfTicketsError', 'customerIdError'];
        idList.forEach(element => {
            const select = fixture.debugElement.query(By.css(`#${element}`));
            expect(select).not.toBeNull();
        });
    });

    it('BookFlightComponent : Missing FormControl Property', () => {
        // component.selected = true;
        fixture.detectChanges();
        const bookingForm: DebugElement = fixture.debugElement.query(By.css('form'));
        const passengerName: DebugElement = fixture.debugElement.query(By.css('#passengerName'));
        const noOfTickets: DebugElement = fixture.debugElement.query(By.css('#noOfTickets'));
        const flightId: DebugElement = fixture.debugElement.query(By.css('#flightId'));
        const customerId: DebugElement = fixture.debugElement.query(By.css('#customerId'));
        expect(bookingForm.attributes['ng-reflect-form']).toBeTruthy();
        expect(passengerName.attributes['formControlName']).toBe('passengerName');
        expect(noOfTickets.attributes['formControlName']).toBe('noOfTickets');
        expect(flightId.attributes['formControlName']).toBe('flightId');
        expect(customerId.attributes['formControlName']).toBe('customerId');

    });

    it('BookFlightComponent : book method implemented according to given requirement', () => {
        spyOn(bookFlightService, 'bookFlight').and.returnValue(of({ message: 'Success message is populated' }));
        component.book();
        expect(component.errorMessage).toBe(null);
    });

    it('BookFlightComponent: Added required dependencies without additional dependencies', inject([BookFlightService, FormBuilder], (service: BookFlightService, fb: FormBuilder) => {
        expect(service).not.toBeNull('service not injected');
        expect(fb).not.toBeNull('Form builder not injected');
    }));
    it('BookFlightComponent: Success Message being populated', () => {
        component.successMessage = "message"
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css('#successMessage'))

        expect(select).not.toBeNull();
    });
    it('BookFlightComponent: Error Message being populated', () => {
        component.errorMessage = "message"
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css('#errorMessage'))
        
        expect(select).not.toBeNull();
    });
    it('BookFlightComponent: passengerNameError Message being populated', () => {
        component.successMessage = "message"
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css('#passengerNameError'))

        expect(select).not.toBeNull();
    });
    it('BookFlightComponent: noOfTicketsError Message being populated', () => {
        component.errorMessage = "message"
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css('#noOfTicketsError'))
        expect(select).not.toBeNull();
    });
    it('BookFlightComponent: customerIdError Message being populated', () => {
        component.successMessage = "message"
        fixture.detectChanges();
        const select = fixture.debugElement.query(By.css('#customerIdError'))

        expect(select).not.toBeNull();
    });


});

