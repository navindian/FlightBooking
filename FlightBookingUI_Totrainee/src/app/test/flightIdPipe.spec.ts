import { FlightIdPipe } from '../../app/flight-id.pipe';

describe('Testing MessagePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new FlightIdPipe();
    });

    it('TCFP 1 - Create an instance of Pipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('TCFP 2 - Valid return for null Value', () => {
        let testInput = [{"test":"testValue"}]
        let flightId=null
        expect(pipe.transform(testInput,flightId)).toBe(testInput)
    })

    it('TCFP 3 - Valid return for valid flightId', () => {
        let testInput =[{flightId:"101",no:1},{flightId:"102",no:2},{flightId:"101",no:3}]
        let flightId="101"
        expect(pipe.transform(testInput,flightId)).toEqual([{flightId:"101",no:1},{flightId:"101",no:3}])
    })

    it('TCFP 4 - Valid return for no matching flightId', () => {
        let testInput =[{flightId:"101",no:1},{flightId:"102",no:2},{flightId:"101",no:3}]
        let flightId="103"
        expect(pipe.transform(testInput,flightId)).toEqual([])
    })

})