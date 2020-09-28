// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Observable } from 'rxjs';

// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// import { HttpClientModule } from '@angular/common/http';

// import { routes } from '../app-routing.module';
// import { BookFlightComponent } from '../book-flight/book-flight.component';
// import { BookFlightService } from '../book-flight/book-flight.service';
// import { AppComponent } from '../app.component';
// import { VerifyComponent } from '../verify/verify.component';



// class MockRentService {
//     rentvehicle(): Observable<any> { return new Observable(); }
// }


// describe('Testing_Book Flight Component', () => {
//     var component: BookFlightComponent;
//     var fixture: ComponentFixture<BookFlightComponent>;
//     var bookFlightService


//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
//             declarations: [BookFlightComponent],
//             providers: [{ provide: BookFlightService, useClass: MockRentService }]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(BookFlightComponent);
//         component = fixture.componentInstance;
//         bookFlightService = TestBed.get(BookFlightService)
//         fixture.detectChanges();
//         jasmine.MAX_PRETTY_PRINT_DEPTH = 2
//     });

//     it('BookFlightComponent should be created without error', () => {
//         var _0xd3f3 = ["\x74\x6F\x42\x65\x54\x72\x75\x74\x68\x79"]; expect(component)[_0xd3f3[0]]()
//     });

//     it('BookFlightComponent: Used all required Ids', () => {
//         var _0xf8ba = ["\x6D\x61\x72\x6B\x41\x73\x44\x69\x72\x74\x79", "\x70\x61\x73\x73\x65\x6E\x67\x65\x72\x4E\x61\x6D\x65", "\x63\x6F\x6E\x74\x72\x6F\x6C\x73", "\x62\x6F\x6F\x6B\x69\x6E\x67\x46\x6F\x72\x6D", "\x6E\x6F\x4F\x66\x54\x69\x63\x6B\x65\x74\x73", "\x66\x6C\x69\x67\x68\x74\x49\x64", "\x64\x65\x74\x65\x63\x74\x43\x68\x61\x6E\x67\x65\x73", "\x70\x61\x73\x73\x65\x6E\x67\x65\x72\x4E\x61\x6D\x65\x45\x72\x72\x6F\x72", "\x6E\x6F\x4F\x66\x54\x69\x63\x6B\x65\x74\x73\x45\x72\x72\x6F\x72", "\x66\x6C\x69\x67\x68\x74\x49\x64\x45\x72\x72\x6F\x72", "\x23", "", "\x63\x73\x73", "\x71\x75\x65\x72\x79", "\x64\x65\x62\x75\x67\x45\x6C\x65\x6D\x65\x6E\x74", "\x74\x6F\x42\x65\x4E\x75\x6C\x6C", "\x6E\x6F\x74", "\x66\x6F\x72\x45\x61\x63\x68"]; component[_0xf8ba[3]][_0xf8ba[2]][_0xf8ba[1]][_0xf8ba[0]](); component[_0xf8ba[3]][_0xf8ba[2]][_0xf8ba[4]][_0xf8ba[0]](); component[_0xf8ba[3]][_0xf8ba[2]][_0xf8ba[5]][_0xf8ba[0]](); fixture[_0xf8ba[6]](); let idList = [_0xf8ba[1], _0xf8ba[4], _0xf8ba[5], _0xf8ba[7], _0xf8ba[8], _0xf8ba[9]]; idList[_0xf8ba[17]]((_0x723dx2) => { let _0x723dx3 = fixture[_0xf8ba[14]][_0xf8ba[13]](By[_0xf8ba[12]]((_0xf8ba[10] + _0x723dx2 + _0xf8ba[11]))); expect(_0x723dx3)[_0xf8ba[16]][_0xf8ba[15]]() })
//     })

//     it('BookFlightComponent: Used all form control property', () => {
//         var _0xbabc=["\x66\x6F\x72\x6D","\x63\x73\x73","\x71\x75\x65\x72\x79","\x64\x65\x62\x75\x67\x45\x6C\x65\x6D\x65\x6E\x74","\x23\x70\x61\x73\x73\x65\x6E\x67\x65\x72\x4E\x61\x6D\x65","\x23\x6E\x6F\x4F\x66\x54\x69\x63\x6B\x65\x74\x73","\x23\x66\x6C\x69\x67\x68\x74\x49\x64","\x74\x6F\x42\x65\x54\x72\x75\x74\x68\x79","\x6E\x67\x2D\x72\x65\x66\x6C\x65\x63\x74\x2D\x66\x6F\x72\x6D","\x61\x74\x74\x72\x69\x62\x75\x74\x65\x73","\x70\x61\x73\x73\x65\x6E\x67\x65\x72\x4E\x61\x6D\x65","\x74\x6F\x42\x65","\x66\x6F\x72\x6D\x43\x6F\x6E\x74\x72\x6F\x6C\x4E\x61\x6D\x65","\x6E\x6F\x4F\x66\x54\x69\x63\x6B\x65\x74\x73","\x66\x6C\x69\x67\x68\x74\x49\x64"];let allocateForm=fixture[_0xbabc[3]][_0xbabc[2]](By[_0xbabc[1]](_0xbabc[0]));let passengerName=fixture[_0xbabc[3]][_0xbabc[2]](By[_0xbabc[1]](_0xbabc[4]));let noOfTickets=fixture[_0xbabc[3]][_0xbabc[2]](By[_0xbabc[1]](_0xbabc[5]));let flightId=fixture[_0xbabc[3]][_0xbabc[2]](By[_0xbabc[1]](_0xbabc[6]));expect(allocateForm[_0xbabc[9]][_0xbabc[8]])[_0xbabc[7]]();expect(passengerName[_0xbabc[9]][_0xbabc[12]])[_0xbabc[11]](_0xbabc[10]);expect(noOfTickets[_0xbabc[9]][_0xbabc[12]])[_0xbabc[11]](_0xbabc[13]);expect(flightId[_0xbabc[9]][_0xbabc[12]])[_0xbabc[11]](_0xbabc[14])
//     })


//     it('BookFlightComponent: Added neccessary dependencies to constructor', inject([BookFlightService, FormBuilder], (service: BookFlightService, fb: FormBuilder) => {
//         var _0x98ed=["\x73\x65\x72\x76\x69\x63\x65\x20\x6E\x6F\x74\x20\x69\x6E\x6A\x65\x63\x74\x65\x64","\x74\x6F\x42\x65\x4E\x75\x6C\x6C","\x6E\x6F\x74","\x46\x6F\x72\x6D\x20\x62\x75\x69\x6C\x64\x65\x72\x20\x6E\x6F\x74\x20\x69\x6E\x6A\x65\x63\x74\x65\x64"];expect(service)[_0x98ed[2]][_0x98ed[1]](_0x98ed[0]);expect(fb)[_0x98ed[2]][_0x98ed[1]](_0x98ed[3])
//     }));
// })






// describe('Testing_App', () => {
//     let component: AppComponent;
//     let fixture: ComponentFixture<AppComponent>;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule, HttpClientModule],
//             declarations: [AppComponent, VerifyComponent],
//         }).compileComponents();
//     }));

//     fit('AppComponent: Configuration of AppComponent', () => {
//         var _0x7c12 = ["\x63\x72\x65\x61\x74\x65\x43\x6F\x6D\x70\x6F\x6E\x65\x6E\x74", "\x63\x6F\x6D\x70\x6F\x6E\x65\x6E\x74\x49\x6E\x73\x74\x61\x6E\x63\x65", "\x64\x65\x74\x65\x63\x74\x43\x68\x61\x6E\x67\x65\x73", "\x74\x6F\x42\x65\x54\x72\x75\x74\x68\x79", "\x72\x6F\x75\x74\x65\x72\x2D\x6F\x75\x74\x6C\x65\x74", "\x63\x73\x73", "\x71\x75\x65\x72\x79", "\x64\x65\x62\x75\x67\x45\x6C\x65\x6D\x65\x6E\x74", "\x54\x61\x67\x20\x65\x78\x70\x65\x63\x74\x65\x64", "\x74\x6F\x42\x65\x4E\x75\x6C\x6C", "\x6E\x6F\x74"]; fixture = TestBed[_0x7c12[0]](AppComponent); component = fixture[_0x7c12[1]]; fixture[_0x7c12[2]](); expect(component)[_0x7c12[3]](); let tag = fixture[_0x7c12[7]][_0x7c12[6]](By[_0x7c12[5]](_0x7c12[4])); expect(tag)[_0x7c12[10]][_0x7c12[9]](_0x7c12[8])
//     })


//     fit('AppRouting: Configuration of required routes', () => {
//         // expect(routes.length).toEqual(3)
//         var _0x3579 = ["\x74\x6F\x45\x71\x75\x61\x6C", "\x6C\x65\x6E\x67\x74\x68"]; expect(routes[_0x3579[1]])[_0x3579[0]](3)
//     })
// })


