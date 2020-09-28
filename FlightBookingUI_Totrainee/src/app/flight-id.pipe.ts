import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightId'
})
export class FlightIdPipe implements PipeTransform {

  transform(value: any, flightId: any): any {
     // filter the bookings array based on flightId
     if (flightId) {
      return value.filter((obj) => obj.flightId == flightId)
    }
    return value
  }
  }


