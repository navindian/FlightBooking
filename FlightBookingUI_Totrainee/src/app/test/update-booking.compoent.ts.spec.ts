import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';
import { UpdateBookingService } from '../update-booking/update-booking.service';


class UpdateBookingServiceStub {   
    updateBooking(formObj) { return new Observable()}
}
let mockRouter = {
    navigate: jasmine.createSpy('navigate')
}
describe('Update Booking Component',()=>{
    let component: UpdateBookingComponent;
    let fixture: ComponentFixture<UpdateBookingComponent>;
    let updateBookingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
            declarations: [UpdateBookingComponent],
            providers: [{ provide: UpdateBookingService, useClass: UpdateBookingServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateBookingComponent);
        component = fixture.componentInstance;
        updateBookingService = TestBed.get(UpdateBookingService);
        let newbookingDetails ={
            bookingId: 2001,
            noOfTickets: 1,
            flightId: "IND-101"}
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2
    });

    it('TUC 1 - UpdateBooking : Component should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('TUC 2 - Bookings : Should invoke delete() method of viewDetailsService', () => {
        let spy = spyOn(updateBookingService, 'updateBooking').and.returnValue(of({ message: 'Success message is populated' }));
        component.updateBooking()
        fixture.detectChanges();
        fixture.whenStable().then(data => {
            expect(spy).toHaveBeenCalled();
        })
    });

    it('TUC 3 - Bookings : Should populate success message into successMessage property', () => {
        let spy = spyOn(updateBookingService, 'updateBooking').and.returnValue(of({ message: 'Success message is populated' }));
        expect(component.successMessage).toBe(undefined);
        component.updateBooking();
        fixture.detectChanges();
        expect(component.successMessage).toBe('Success message is populated');
    });

    it('TUC 4 - Bookings : Should populate error message into errorMessage property', () => {
        let spy = spyOn(updateBookingService, 'updateBooking').and.returnValue(throwError({ error: { message: "Updation failed" } }));
        expect(component.errorMessage).toBe(undefined);
        component.updateBooking();
        fixture.detectChanges();
        expect(component.errorMessage).toBe('Updation failed');
    });

    it('TUC 5 - Bookings : errorMessage property should be null in success case', () => {
        spyOn(updateBookingService, 'updateBooking').and.returnValue(of({ message: "success message" }));
        component.updateBooking();
        fixture.detectChanges();
        expect(component.errorMessage).toBe(null);
    });

    it('TUC 6 - Bookings : successMessage property should be null in error case', () => {
        spyOn(updateBookingService, 'updateBooking').and.returnValue(throwError({ error: { message: "error occured" } }));
        component.updateBooking();
        fixture.detectChanges();
        expect(component.successMessage).toBe(null);
    });
})

describe('UpdateBookingComponent', () => {
    let component: UpdateBookingComponent;
    let fixture: ComponentFixture<UpdateBookingComponent>;
    let updateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule],
            declarations: [UpdateBookingComponent],
            providers: [{ provide: UpdateBookingService, useClass: UpdateBookingServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateBookingComponent);
        component = fixture.componentInstance;
        updateService = TestBed.get(UpdateBookingService);
        fixture.detectChanges();
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
    });

});

// describe('Verifying the fields in UpdateBooking  component', () => {
//     let component: UpdateBookingComponent;
//     let fixture: ComponentFixture<UpdateBookingComponent>;
//     let updateService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
//             declarations: [UpdateBookingComponent],
//             providers: [{ provide: UpdateBookingService, 
//                 useClass: UpdateBookingServiceStub },
//                  { provide: Router, useValue: mockRouter }]
//         }).compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(UpdateBookingComponent);
//         component = fixture.componentInstance;
//         updateService = TestBed.get(UpdateBookingService)
//         fixture.detectChanges();
//         jasmine.MAX_PRETTY_PRINT_DEPTH = 2
//     });

//     describe('Testing noOfTickets field for when no data is entered into the field', () => {
//         let noOfTickets;
//         let errors;
//         let noOfTicketsSpan;
//         beforeEach(() => {
//             noOfTickets = component.updateBookingForm.controls['noOfTickets']
//             noOfTickets.setValue('');
//             fixture.detectChanges();
//             noOfTicketsSpan = fixture.debugElement.query(By.css('#noOfTicketsError'))
//             errors = noOfTickets.errors;
//         })

//         // it('TUC 7 - UpdateBooking : noOfTickets should violate required validation for "" ', () => {
//         //     alert(component+"----")
//         //     expect(errors['required']).toBeTruthy()
//         // })

//         // it('TLC 3 - UpdateBooking : noOfTickets should not display the error message initially', () => {
//         //     expect(noOfTicketsSpan).toBeFalsy();
//         // });

//         // it('TLC 4 - UpdateBooking : noOfTickets should display the invalid error message', () => {
//         //     noOfTickets.markAsDirty()
//         //     fixture.detectChanges()
//         //     noOfTicketsSpan = fixture.debugElement.query(By.css('#noOfTicketsError'))
//         //     expect(noOfTicketsSpan).toBeTruthy();
//         // });

//         // it('TLC 5 - UpdateBooking : noOfTickets validation for no input should be invalid', () => {
//         //     expect(noOfTickets.valid).toBeFalsy()
//         // })
//     })

//     // describe('Testing noOfTickets field for incorrect value', () => {
//     //     let noOfTickets;
//     //     let errors;
//     //     let noOfTicketsSpan;
//     //     beforeEach(() => {
//     //         noOfTickets = component.UpdateBooking Form.controls['noOfTickets'];
//     //         noOfTickets.setValue(1111);
//     //         fixture.detectChanges();
//     //         noOfTicketsSpan = fixture.debugElement.query(By.css('#noOfTicketsError'))
//     //         errors = noOfTickets.errors;
//     //     })

//     //     it('TLC 6 - UpdateBooking : noOfTickets validation for no valid input should be required', () => {
//     //         expect(errors).not.toBeNull()
//     //     })

//     //     it('TLC 7 - UpdateBooking : noOfTickets should not display the error message for valid value', () => {
//     //         expect(noOfTicketsSpan).toBeNull();
//     //     });

//     //     it('TLC 8 - UpdateBooking : noOfTickets should not display the invalid error message for valid value', () => {
//     //         noOfTickets.markAsDirty()
//     //         fixture.detectChanges()
//     //         expect(noOfTicketsSpan).toBeNull();
//     //     });

//     //     it('TLC 9 - UpdateBooking : noOfTickets validation for valid input', () => {
//     //         expect(noOfTickets.valid).toBeFalsy();
//     //     })
//     // })

//     // describe('Testing noOfTickets field for correct value', () => {
//     //     let errors;
//     //     let noOfTickets: AbstractControl;
//     //     let noOfTicketsSpan;

//     //     beforeEach(() => {
//     //         noOfTickets = component.UpdateBooking Form.controls['noOfTickets'];
//     //         noOfTickets.setValue(101);
//     //         noOfTickets.markAsDirty();
//     //         fixture.detectChanges();
//     //         noOfTicketsSpan = fixture.debugElement.query(By.css('#noOfTicketsError'));
//     //         errors = noOfTickets.errors;
//     //     });


//     //     it('TLC 10 - UpdateBooking :noOfTickets should not contain error', () => {
//     //         expect(errors).toBeFalsy();
//     //     });

//     //     it('TLC 11 - UpdateBooking  should not display the error message', () => {
//     //         expect(noOfTicketsSpan).toBeFalsy();
//     //     })

//     //     it('TLC 12 - UpdateBooking :noOfTickets should be of type number', () => {
//     //         let noOfTicketsType = fixture.debugElement.query(By.css('#noOfTickets'));
//     //         expect(noOfTicketsType.attributes['type']).toBe('number');
//     //     });

//     //     it('TLC 13 - UpdateBooking :noOfTickets should be valid', () => {
//     //         expect(noOfTickets.valid).toBeTruthy();
//     //     });

//     // });

//     // describe('Testing password field for when no data is entered into the field', () => {
//     //     let errors;
//     //     let password;
//     //     let passwordSpan;
//     //     beforeEach(() => {
//     //         password = component.UpdateBooking Form.controls['password'];
//     //         password.setValue('');
//     //         fixture.detectChanges();
//     //         errors = password.errors;
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //     });

//     //     it('TLC 14 - UpdateBooking : password should be invalid', () => {
//     //         expect(password.valid).toBeFalsy();
//     //     });

//     //     it('TLC 15 - UpdateBooking : password should contain required error for "" ', () => {
//     //         expect(errors['required']).toBeTruthy();
//     //     });
//     // });

//     // describe('Testing password field for incorrect values', () => {
//     //     let errors;
//     //     let password;
//     //     let passwordSpan;
//     //     beforeEach(() => {
//     //         password = component.UpdateBooking Form.controls['password'];
//     //     });

//     //     it('TLC 16 - UpdateBooking : password field should be invalid', () => {
//     //         password.setValue('123Allen123');
//     //         fixture.detectChanges();
//     //         errors = password.errors;
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //         expect(password.valid).toBeFalsy();
//     //     });

//     //     it('TLC 17  - UpdateBooking : password should contain pattern error for 123Allen123', () => {
//     //         password.setValue('123Allen123');
//     //         fixture.detectChanges();
//     //         errors = password.errors;
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //         expect(errors['pattern']).toBeTruthy();
//     //     });

//     //     it('TLC 18  - UpdateBooking : password should contain pattern error for Allen123abc', () => {
//     //         password.setValue('Allen123abc');
//     //         fixture.detectChanges();
//     //         errors = password.errors;
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //         expect(errors['pattern']).toBeTruthy();
//     //     });

//     //     it('TLC 19  - UpdateBooking : password should contain pattern error for Allen@123', () => {
//     //         password.setValue('Allen@123');
//     //         fixture.detectChanges();
//     //         errors = password.errors;
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //         expect(errors['pattern']).toBeTruthy();
//     //     });
//     // });

//     // describe('Testing password field for correct value', () => {
//     //     let errors;
//     //     let password: AbstractControl;
//     //     let passwordSpan;

//     //     beforeEach(() => {
//     //         password = component.UpdateBooking Form.controls['password'];
//     //         password.setValue('Allen123');
//     //         password.markAsDirty();
//     //         fixture.detectChanges();
//     //         passwordSpan = fixture.debugElement.query(By.css('#passwordError'));
//     //         errors = password.errors;
//     //     });

//     //     it('TLC 20  - UpdateBooking : password should be valid', () => {
//     //         expect(password.valid).toBeTruthy();
//     //     });
//     //     it('TLC 21 - UpdateBooking : password should not contain error', () => {
//     //         expect(errors).toBeFalsy();
//     //     });
//     //     it('TLC 22 - UpdateBooking : should not display the error message', () => {
//     //         expect(passwordSpan).toBeFalsy();
//     //     })
//     //     it('TLC 23 - UpdateBooking : password should be of type password', () => {
//     //         let passwordType = fixture.debugElement.query(By.css('#password'));
//     //         expect(passwordType.attributes['type']).toBe('password');
//     //     });
//     // });

//     // describe('Submiting invalid data', () => {
//     //     let submitBtn;
//     //     beforeEach(() => {
//     //         component.UpdateBooking Form.controls['noOfTickets'].setValue(null);
//     //         component.UpdateBooking Form.controls['password'].setValue('allen');
//     //         fixture.detectChanges();
//     //         submitBtn = fixture.debugElement.query(By.css('button')).nativeElement;
//     //     })

//     //     it('TLC 24 - UpdateBooking : Form level validation should be invalid', () => {
//     //         expect(component.UpdateBooking Form.valid).toBeFalsy();
//     //     });

//     //     it('TLC 25 - UpdateBooking : Submit button should have disabled property', () => {
//     //         expect(submitBtn.disabled).toBeTruthy();
//     //     });
//     // });

//     // describe('Submiting valid data', () => {

//     //     it('TLC 26 - UpdateBooking : Check if the UpdateBooking  method calls service method (UpdateBooking )', () => {
//     //         const spy = spyOn(UpdateBooking Service, "UpdateBooking ").and.returnValue(of({ message: 'Success' }));
//     //         component.UpdateBooking ();
//     //         expect(spy).toHaveBeenCalled();
//     //     })

//     //     it('should navigate', inject([Router], (router: Router) => {
//     //         component.UpdateBooking Form.setValue({ noOfTickets: 101, password: 'Allen123' });
//     //         fixture.detectChanges();
//     //         spyOn(UpdateBooking Service, "UpdateBooking ").and.returnValue(of(true));
//     //         component.UpdateBooking ();
//     //         expect(mockRouter.navigate).toHaveBeenCalledWith(['/view', component.UpdateBooking Form.value.noOfTickets]);
//     //     }));

//     //     it('TLC 27 -  UpdateBooking : UpdateBooking  method nullifies error message on success', () => {
//     //         component.UpdateBooking Form.setValue({ noOfTickets: 101, password: 'Allen123' });
//     //         fixture.detectChanges();
//     //         spyOn(UpdateBooking Service, "UpdateBooking ").and.returnValue(of(true));
//     //         component.UpdateBooking ();
//     //         let data = (component.errorMessage === "") ? true : ((component.errorMessage === null) ? true : false)
//     //         expect(data).toBeTruthy();
//     //     })

//     //     it('TLC 28 - UpdateBooking : Check if the UpdateBooking  method populates errorMessage in error case', () => {
//     //         spyOn(UpdateBooking Service, "UpdateBooking ").and.returnValue(throwError({ error: { message: 'Error' } }));
//     //         component.UpdateBooking ();
//     //         expect(component.errorMessage).toBe("Error");
//     //     })
//     // })


//     // describe('Checking HTML form elements binding', () => {
//     //     let UpdateBooking FormTag: DebugElement;
//     //     let noOfTicketsTag: DebugElement;
//     //     let passwordTag: DebugElement;

//     //     beforeEach(() => {
//     //         UpdateBooking FormTag = fixture.debugElement.query(By.css('form'));
//     //         noOfTicketsTag = fixture.debugElement.query(By.css('#noOfTickets'));
//     //         passwordTag = fixture.debugElement.query(By.css('#password'));
//     //     });

//     //     it('TLC 29 - UpdateBooking : check binding of formgroup to form tag', () => {
//     //         expect(UpdateBooking FormTag.attributes['ng-reflect-form']).toBeTruthy();
//     //     });

//     //     it('TLC 30 - UpdateBooking : check noOfTickets tag is binded correctly', () => {
//     //         expect(noOfTicketsTag.attributes['formControlName']).toBe('noOfTickets');
//     //     });

//     //     it('TLC 31 - UpdateBooking : check password tag is binded correctly', () => {
//     //         expect(passwordTag.attributes['formControlName']).toBe('password');
//     //     });
//     // });


//     // describe('Check if bootstrap classes are properly used', () => {
//     //     let UpdateBooking FormTag: DebugElement;
//     //     let noOfTicketsTag: DebugElement;
//     //     let passwordTag: DebugElement;
//     //     let buttonTag: DebugElement;
//     //     let noOfTicketsErrorTag: DebugElement;
//     //     let passwordErrorTag: DebugElement;

//     //     beforeEach(() => {
//     //         component.UpdateBooking Form.controls['noOfTickets'].setValue(null);
//     //         component.UpdateBooking Form.controls['password'].setValue(null);
//     //         component.UpdateBooking Form.controls['noOfTickets'].markAsDirty();
//     //         component.UpdateBooking Form.controls['password'].markAsDirty();
            
//     //         fixture.detectChanges();

//     //         UpdateBooking FormTag = fixture.debugElement.query(By.css('form'));
//     //         noOfTicketsTag = fixture.debugElement.query(By.css('#noOfTickets'));
//     //         passwordTag = fixture.debugElement.query(By.css('#password'));

//     //         noOfTicketsErrorTag = fixture.debugElement.query(By.css('#noOfTicketsError'));
//     //         passwordErrorTag = fixture.debugElement.query(By.css('#passwordError'));

//     //         buttonTag = fixture.debugElement.query(By.css('button'));
//     //     });

//     //     it("TLC 32 - UpdateBooking : noOfTickets tag has class form-group", () => {
//     //         expect(noOfTicketsTag.parent.attributes['class']).toBe('form-group');
//     //     })

//     //     it('TLC 33 - UpdateBooking : noOfTickets tag has class form-control', () => {
//     //         expect(noOfTicketsTag.attributes['class']).toBe('form-control');
//     //     })

//     //     it("TLC 34 - UpdateBooking : password tag has class form-group", () => {
//     //         expect(passwordTag.parent.attributes['class']).toBe('form-group');
//     //     })

//     //     it('TLC 35 - UpdateBooking : password tag has class form-control', () => {
//     //         expect(passwordTag.attributes['class']).toBe('form-control');
//     //     })

//     //     it("TLC 36 - UpdateBooking : button should have class btn-primary", () => {
//     //         expect(buttonTag.attributes['class']).toMatch(/btn-primary/);
//     //     })

//     //     it('TLC 37 - UpdateBooking :noOfTickets tag should have class alert-danger', () => {
//     //         expect(noOfTicketsErrorTag.attributes['class']).toMatch(/alert-danger/);
//     //     })

//     //     it('TLC 38 - UpdateBooking :password tag should have class alert-danger', () => {
//     //         expect(passwordErrorTag.attributes['class']).toMatch(/alert-danger/);
//     //     })
//     })
