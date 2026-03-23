const express = require("express");
const isAuth = require("../middleware/isAuth.js");
const { createBooking, getMyBookings } = require("../controllers/booking.controller.js");

const bookingRouter = express.Router();

bookingRouter.post("/:listingId", isAuth, createBooking);
bookingRouter.get("/mybookings", isAuth, getMyBookings);

module.exports = bookingRouter;