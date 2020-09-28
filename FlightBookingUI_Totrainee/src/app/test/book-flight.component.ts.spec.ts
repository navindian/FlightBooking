import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../app.component';
import { routes } from '../app-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { VerifyComponent } from '../verify/verify.component';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';
import { ViewDetailsService } from '../view-details/view-details.service';
import { ViewFlightsComponent } from '../view-flights/view-flights.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { FlightIdPipe } from '../flight-id.pipe';
import { CustomerIdPipe } from '../customer-id.pipe';
import { BookFlightService } from '../book-flight/book-flight.service';
class MockBookFlightService {
    bookFlight(): Observable<any> { return new Observable(); }

}
class MockViewDetailsService {
    view(): Observable<any> { return new Observable() }
    delete(): Observable<any> { return new Observable(); }
}

describe('Testing_View_Flights_Component', () => {
    let component: ViewFlightsComponent;
    let fixture: ComponentFixture<ViewFlightsComponent>;
    let bookFlightService;
    let viewDetailsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [ViewFlightsComponent, ViewFlightsComponent],
            providers: [{ provide: BookFlightService, useClass: MockBookFlightService }, { provide: ViewDetailsService, useClass: MockViewDetailsService }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ViewFlightsComponent);
        component = fixture.componentInstance;
        bookFlightService = TestBed.get(BookFlightService);
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        // component.selected = true
        
    });
    it('ViewFlightsComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ViewFlightsComponent : sendFlightData method implemented according to given requirement', () => {
        spyOn(bookFlightService, 'bookFlight').and.returnValue(of({ message: 'Success message is populated' }));
        component.sendFlightData({});
        expect(component.errorMessage).toBe(null);
    });
});

describe('Testing_View_Details_Component', () => {
    let component: ViewDetailsComponent;
    let fixture: ComponentFixture<ViewDetailsComponent>;
    let viewDetailsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [ViewDetailsComponent, ViewFlightsComponent],
            providers: [{ provide: ViewDetailsService, useClass: MockViewDetailsService }, { provide: ViewDetailsService, useClass: MockViewDetailsService }]
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
    it('ViewDetailsComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ViewDetailsComponent : Missing FormControl Property', () => {
        // component.selected = true;
        fixture.detectChanges();
        const customerIdInput: DebugElement = fixture.debugElement.query(By.css('#customerId'));
        const flightIdInput: DebugElement = fixture.debugElement.query(By.css('#FlightId'));
        const filterBtn: DebugElement = fixture.debugElement.query(By.css('#filterBtn'));
        const resetBtn: DebugElement = fixture.debugElement.query(By.css('#resetBtn'));
        expect(customerIdInput.attributes.value).toBeUndefined();
        expect(flightIdInput.attributes.value).toBeUndefined();
        // expect(filterBtn.attributes[]).toBeUndefined();
        // expect(resetBtn.attributes[]).toBeUndefined();

    });

    it('ViewDetailsComponent : viewAllBookings method implemented according to given requirement', () => {
        spyOn(viewDetailsService, 'view').and.returnValue(of({ message: 'Success message is populated' }));
        component.viewAllBookings();
        expect(component.errorMessage).toBe(null);
    });

    it('ViewDetailsComponent: Added required dependencies without additional dependencies', inject([viewDetailsService, FormBuilder], (service: ViewDetailsService, fb: FormBuilder) => {
        expect(service).not.toBeNull('service not injected');
        expect(fb).not.toBeNull('Form builder not injected');
    }));

});