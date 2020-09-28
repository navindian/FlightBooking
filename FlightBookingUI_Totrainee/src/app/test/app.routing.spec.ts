import { routes } from '../app-routing.module';

describe("AppRoutingModule", () => {
    it('TRM 1 - Check whether the Catchall is provided', () => {
        let path_length = routes.length;
        let val = 0
        let pathGiven = routes[path_length - 1].path;
        let redirectTo = routes[path_length - 1].redirectTo;
        let pathMatch = routes[path_length - 1].pathMatch;
        if (/^\*\*$/.test(pathGiven) && /^[\/]?book$/i.test(redirectTo)) {
            val++;
        }
        expect(val).toBeGreaterThanOrEqual(1)
    })

    it('TRM 2 - Check if routes are present', () => {
        let flag: number = 0;
        for (let element of routes) {
            if (/^[\/]?book$/i.test(element.path) && element.component.name =="BookFlightComponent") {
                flag++;
            }
            else if (/^[\/]?view/i.test(element.path) && element.component.name == "ViewDetailsComponent") {
                flag++;
            }
            else if (/^[\/]?updateBooking/i.test(element.path) && element.component.name == "UpdateBookingComponent") {
                flag++;
            }
            else {
                continue;
            }
        }
        expect(flag).toBe(3);
    })
})
