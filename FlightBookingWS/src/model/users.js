const dbModel = require('../utilities/connection');

const flightBookingDb = {}

flightBookingDb.generateId = () => {
    return dbModel.getFlightCollection().then((model) => {
        return model.distinct("bookings.bookingId").then((ids) => {
            let bId = Math.max(...ids);
            return bId + 1;
        })
    })
}

flightBookingDb.checkCustomer = (customerId) => {
    return dbModel.getCustomerCollection().then((model) => {
        return model.findOne({ customerId: customerId }).then((customer) => {
            if (!customer) {  return null }
            else return customer;
        })
    })
}


flightBookingDb.checkBooking = (bookingId) => {
    return dbModel.getFlightCollection().then((model) => {
        return model.findOne({ "bookings.bookingId": bookingId }).then((flightbooking) => {
            if (!flightbooking) return null;
            else return flightbooking;
        })
    })
}

flightBookingDb.checkAvailability = (flightId) => {
    return dbModel.getFlightCollection().then((model) => {
        return model.findOne({ flightId: flightId }).then((flightRecord) => {
            if (!flightRecord) return null;
            else return flightRecord;
        })
    })
}

flightBookingDb.updateCustomerWallet = (customerId, bookingCost) => {
    return dbModel.getCustomerCollection().then((model) => {
        return model.updateOne({ customerId: customerId }, { $inc: { walletAmount: -bookingCost } })
            .then((saved) => {
                if (saved.nModified == 1) {  return true }
                else return false
            })
    })
}

flightBookingDb.bookFlight = (flightBooking) => {
    return dbModel.getFlightCollection().then((model) => {
        return flightBookingDb.generateId().then((bid) => {
            flightBooking.bookingId = bid;
            return model.updateOne({ flightId: flightBooking.flightId }, { $push: { bookings: flightBooking } })
                .then((data) => {
                    if (data.nModified == 1) {
                        return model.updateOne({ flightId: flightBooking.flightId }, { $inc: { availableSeats: -flightBooking.noOfTickets } })
                            .then((saved) => {
                                if (saved.nModified == 1) {
                                    return flightBookingDb.updateCustomerWallet(flightBooking.customerId, flightBooking.bookingCost)
                                        .then((bookingStatus) => {
                                            if (bookingStatus) return flightBooking.bookingId;
                                            else {
                                                let err = new Error("wallet not updated");
                                                err.status = 400;
                                                throw err;
                                            }
                                        })
                                } else {
                                    let err = new Error("seats not updated");
                                    err.status = 400;
                                    throw err;
                                }
                            })
                    } else {
                        let err = new Error("Booking failed");
                        err.status = 400;
                        throw err;
                    }
                })
        })
    })
}

flightBookingDb.getAllBookings = () => {
    return dbModel.getFlightCollection().then((model) => {
        return model.find({}, {}).then((bookings) => {
            if (!bookings || bookings.length == 0) return null;
            else return bookings;
        })
    })
}

flightBookingDb.customerBookingsByFlight = (customerId, flightId) => {
    return dbModel.getFlightCollection().then((model) => {
        return model.findOne({ flightId: flightId }, { _id: 0, bookings: 1 })
            .then((bookings) => {
                let myBookings = []
                for (let booking of bookings.bookings) {
                    if (booking.customerId == customerId) {
                        myBookings.push(booking);
                    } else continue;
                }
                if (!myBookings || myBookings.length == 0) return null;
                else return myBookings;
            })
    })
}

flightBookingDb.getbookingsByFlightId = (flightId) => {
    return dbModel.getFlightCollection().then((model) => {
        return model.find({ flightId: flightId }, { _id: 0, bookings: 1 })
            .then((bookings) => {
                if (!bookings || bookings.length == 0) return null;
                else return bookings;
            })
    })
}

flightBookingDb.updateBooking = (bookingId, noOfTickets) => {
    return dbModel.getFlightCollection().then((model) => {
        return model.updateOne({ "bookings.bookingId": bookingId }, { $inc: { "bookings.$.noOfTickets": noOfTickets, availableSeats: -noOfTickets } }).then((updated) => {
            if (updated.nModified == 1) {
                return model.findOne({ "bookings.bookingId": bookingId }).then((flight) => {
                    if (flight) {
                        return model.updateOne({ "bookings.bookingId": bookingId }, { $inc: { "bookings.$.bookingCost": noOfTickets * flight.fare } }).then((saved) => {
                            if (saved.nModified == 1) {
                                for (let booking of flight.bookings) {
                                    if (booking.bookingId == bookingId) { custId = booking.customerId; break; }
                                    else continue;
                                }
                                return dbModel.getCustomerCollection().then((model1) => {
                                    return model1.updateOne({ customerId: custId }, { $inc: { walletAmount: -(noOfTickets * flight.fare) } }).then((wupdated) => {
                                        if (wupdated.nModified == 1) {
                                            return flightBookingDb.checkAvailability(flight.flightId).then((flight) => {
                                                return flight;
                                            })
                                        }
                                        else return null;
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    })
}

// flightBookingDb.deleteBooking = (id) => {
//     return dbModel.getFlightCollection().then(model => {
//         return model.deleteOne({ bookingId: id }).then(deleted => {
//             if (deleted.n > 0) return id;
//             else return null;
//         })
//     })
// }

flightBookingDb.deleteBooking = (id) =>{
    return dbModel.getFlightCollection().then((model) =>{
        return model.findOne({"bookings.bookingId":id}).then((flight) =>{
            if(flight){
                return model.updateOne({"bookings.bookingId":id},{ $pull :{bookings : {bookingId : id} }}).then((res)=>{
                    if(res.nModified==1){
                        return flight
                    }
                    else{
                        return null
                    }
                })
            }
        })
    }) 
}
module.exports = flightBookingDb;