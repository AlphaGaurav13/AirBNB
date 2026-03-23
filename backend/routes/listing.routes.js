const express = require("express")
const isAuth = require("../middleware/isAuth.js")
const upload = require("../middleware/multer.js")
const {addListing, getListing, getMyListings, getListingById, updateListing} = require("../controllers/listing.controller.js")

let listingRouter = express.Router();

listingRouter.post("/add", isAuth, upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1}
]), addListing);

listingRouter.get("/get", getListing)
listingRouter.get("/mylistings", isAuth, getMyListings)
listingRouter.get("/:id", getListingById)
listingRouter.put("/:id", isAuth, upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1}
]), updateListing)

module.exports =  listingRouter