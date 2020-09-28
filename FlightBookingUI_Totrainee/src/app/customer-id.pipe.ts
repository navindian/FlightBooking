import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerId'
})
export class CustomerIdPipe implements PipeTransform {

  transform(value: any, customerId: any): any {
    // filter the bookings array based on customerId
    if(customerId){
      return value.filter((bookings)=>{
        return bookings.customerId==customerId
      })
    }
    return value
  }
}
