import { CustomerIdPipe } from '../../app/customer-id.pipe';

describe('Testing MessagePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new CustomerIdPipe();
    });

    it('TCCP 1 - Create an instance of Pipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('TCCP 2 - Valid return for null Value', () => {
        let testInput = [{"test":"testValue"}]
        let customerId=null
        expect(pipe.transform(testInput,customerId)).toBe(testInput)
    })

    it('TCCP 3 - Valid return for valid customerId', () => {
        let testInput =[{customerId:"101",no:1},{customerId:"102",no:2},{customerId:"101",no:3}]
        let customerId="101"
        expect(pipe.transform(testInput,customerId)).toEqual([{customerId:"101",no:1},{customerId:"101",no:3}])
    })

    it('TCCP 4 - Valid return for no matching customerId', () => {
        let testInput =[{customerId:"101",no:1},{customerId:"102",no:2},{customerId:"101",no:3}]
        let customerId="103"
        expect(pipe.transform(testInput,customerId)).toEqual([])
    })

})