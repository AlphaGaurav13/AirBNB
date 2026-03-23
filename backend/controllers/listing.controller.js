const uploadOnCloudinary = require("../config/cloudinary.js")
const Listing  = require("../model/listing.model.js")
const User = require("../model/user.model.js")


const addListing = async (req, res) => {
    try {
        console.log("addListing called");
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);
        let host = req.userId;
        let {title, description, rent, city, landmark, category} = req.body
        
        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }
        
        let image1 = await uploadOnCloudinary(req.files.image1[0].path);
        let image2 = await uploadOnCloudinary(req.files.image2[0].path);
        let image3 = await uploadOnCloudinary(req.files.image3[0].path);

        if (!image1 || !image2 || !image3) {
            return res.status(500).json({ message: "Failed to upload images to cloud" });
        }

        let listing = await Listing.create({
            title,
            description,
            rent: Number(rent),
            city,
            landmark,
            category,
            image1,
            image2,
            image3,
            host
        })
         let user = await User.findByIdAndUpdate(host, {$push: {listings: listing._id}},
        {new: true})
        return res.status(201).json(listing)
       
    } catch(error) {
        return res.status(500).json({
  message: `Addlisting error ${error}`
    })
}
}


const getListing = async (req, res) => {
        try {
            let listing = await Listing.find().sort({createdAt: - 1});
            res.status(200).json(listing);
        } catch(error) {
            res.status(500).json({message:`getListing error ${error}`});
        }   
}

const getMyListings = async (req, res) => {
    try {
        let listings = await Listing.find({host: req.userId}).sort({createdAt: -1});
        res.status(200).json(listings);
    } catch(error) {
        res.status(500).json({message:`getMyListings error ${error}`});
    }
}

const getListingById = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({message: "Listing not found"});
        }
        res.status(200).json(listing);
    } catch(error) {
        res.status(500).json({message:`getListingById error ${error}`});
    }
}

const updateListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({message: "Listing not found"});
        }
        
        // Check if user is owner of listing
        if (listing.host.toString() !== req.userId) {
            return res.status(403).json({message: "Not authorized to update this listing"});
        }
        
        let {title, description, rent, city, landmark, category} = req.body;
        
        // Handle image updates if new files provided
        let image1 = listing.image1;
        let image2 = listing.image2;
        let image3 = listing.image3;
        
        if (req.files) {
            if (req.files.image1) {
                image1 = await uploadOnCloudinary(req.files.image1[0].path);
            }
            if (req.files.image2) {
                image2 = await uploadOnCloudinary(req.files.image2[0].path);
            }
            if (req.files.image3) {
                image3 = await uploadOnCloudinary(req.files.image3[0].path);
            }
        }
        
        let updatedListing = await Listing.findByIdAndUpdate(req.params.id, {
            title: title || listing.title,
            description: description || listing.description,
            rent: rent ? Number(rent) : listing.rent,
            city: city || listing.city,
            landmark: landmark || listing.landmark,
            category: category || listing.category,
            image1,
            image2,
            image3
        }, {new: true});
        
        res.status(200).json(updatedListing);
    } catch(error) {
        res.status(500).json({message:`updateListing error ${error}`});
    }
}

module.exports = {addListing, getListing, getMyListings, getListingById, updateListing} 