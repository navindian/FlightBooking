import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { XHRBackend, Response, ResponseOptions } from '@angular/http';
import { BookFlightService } from '../book-flight/book-flight.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('BookFlightService Service',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookFlightService, { provide: XHRBackend, useClass: MockBackend }]
        })
            .compileComponents();
    }));

    it('TBS 1 - BookFlightService should be injected', inject([BookFlightService], (service: BookFlightService) => {
        expect(service instanceof BookFlightService).toBe(true);
    }));

    it('TBS 2 - HttpClient must be injected in BookFlightService', inject([HttpClient], (http: HttpClient) => {
        expect(http).not.toBeNull('HttpClient should be provided');
        const service = new BookFlightService(http);
        expect(service instanceof BookFlightService).toBe(true, 'New service should be ok');
    }));
})

describe('Testing fetching data through UpdateBookingService', () => {
    let httpMock: HttpTestingController;
    let dataService: BookFlightService;
    const mockResponse = '{"message":"Successfully booked flight with booking id 2001"}';


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookFlightService]
        });
        httpMock = TestBed.get(HttpTestingController);
        dataService = TestBed.get(BookFlightService);
    });

    it('TBS 3 - BookFlightService should be created', inject([BookFlightService], (service: BookFlightService) => {
        expect(service).toBeTruthy();
    }));

    it('TBS 4 - BookFlightService bookFlight() should return observable', inject([HttpTestingController, BookFlightService], (httpMock, service) => {
        let newbookingDetails ={
            passengerName : "jack",
            noOfTickets: 1,
            flightId: "IND-101",
        customerId : "G1001"}

            service.bookFlight(newbookingDetails).subscribe((response) => {
                expect(response).toBe(mockResponse)
        })

        const mockReq = httpMock.expectOne("http://localhost:1050/bookFlight",newbookingDetails);
        mockReq.flush(mockResponse);
        httpMock.verify();
    }))

    it('TBS 5 - bookFlight() should be called using POST method', inject([HttpClient], (http: HttpClient) => {
        let newbookingDetails ={
            passengerName : "jack",
            noOfTickets: 1,
            flightId: "IND-101",
        customerId : "G1001"}

        const spy = spyOn(http, "post").and.returnValue(of({ message: 'Success' }));
        dataService.bookFlight(newbookingDetails);
        expect(spy).toHaveBeenCalled();
    }))

})
