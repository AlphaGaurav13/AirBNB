const Booking = require("../model/booking.model.js");
const Listing = require("../model/listing.model.js");
const User = require("../model/user.model.js");

const createBooking = async (req, res) => {
    try {
        const { listingId } = req.params;
        const { checkIn, checkOut } = req.body;

        if (!checkIn || !checkOut) {
            return res.status(400).json({ message: "Check-in and check-out dates are required" });
        }

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.isBooked) {
            return res.status(400).json({ message: "Listing already booked" });
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return res.status(400).json({ message: "Invalid booking dates" });
        }

        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = days * listing.rent;

        const booking = await Booking.create({
            listing: listing._id,
            user: req.userId,
            checkIn: start,
            checkOut: end,
            totalPrice,
            status: "confirmed"
        });

        listing.isBooked = true;
        await listing.save();

        const user = await User.findByIdAndUpdate(req.userId, { booking: booking._id }, { new: true });

        res.status(201).json({ booking, totalPrice });
    } catch (error) {
        res.status(500).json({ message: `createBooking error ${error}` });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate("listing").sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: `getMyBookings error ${error}` });
    }
};

module.exports = { createBooking, getMyBookings };