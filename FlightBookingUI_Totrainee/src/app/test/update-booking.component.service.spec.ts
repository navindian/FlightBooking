import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';
import { UpdateBookingService } from '../update-booking/update-booking.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('UpdateBooking Service',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UpdateBookingService, { provide: XHRBackend, useClass: MockBackend }]
        })
            .compileComponents();
    }));

    it('TUS 1 - UpdateBookingService should be injected', inject([UpdateBookingService], (service: UpdateBookingService) => {
        expect(service instanceof UpdateBookingService).toBe(true);
    }));

    it('TUS 2 - HttpClient must be injected in UpdateBookingService', inject([HttpClient], (http: HttpClient) => {
        expect(http).not.toBeNull('HttpClient should be provided');
        const service = new UpdateBookingService(http);
        expect(service instanceof UpdateBookingService).toBe(true, 'New service should be ok');
    }));
})

describe('Testing fetching data through UpdateBookingService', () => {
    let httpMock: HttpTestingController;
    let dataService: UpdateBookingService;
    const mockResponse = '{"message":"Successfully updated flight details for booking id 2001"}';


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UpdateBookingService]
        });
        httpMock = TestBed.get(HttpTestingController);
        dataService = TestBed.get(UpdateBookingService);
    });

    it('TUS 3 - UpdateBookingService should be created', inject([UpdateBookingService], (service: UpdateBookingService) => {
        expect(service).toBeTruthy();
    }));

    it('TUS 4 - UpdateBookingService updateBooking() should return observable', inject([HttpTestingController, UpdateBookingService], (httpMock, service) => {
        let newbookingDetails ={
            bookingId: 2001,
            noOfTickets: 1,
            flightId: "IND-101"}
            service.updateBooking(newbookingDetails).subscribe((response) => {
                expect(response).toBe(mockResponse)
        })

        const mockReq = httpMock.expectOne('http://localhost:1050/updateBooking/' + newbookingDetails.bookingId,newbookingDetails);
        mockReq.flush(mockResponse);
        httpMock.verify();
    }))

    it('TOS 5 - updateBooking() should be called using PUT method', inject([HttpClient], (http: HttpClient) => {
        let newbookingDetails ={
            bookingId: 2001,
            noOfTickets: 1,
            flightId: "IND-101"}
        const spy = spyOn(http, "put").and.returnValue(of({ message: 'Success' }));
        dataService.updateBooking(newbookingDetails);
        expect(spy).toHaveBeenCalled();
    }))

})
