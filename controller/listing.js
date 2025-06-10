const { all } = require("axios");
const Listing = require("../models/listing.js");



//index route

module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
 };

 //givenm form for new listing

 module.exports.renderFormForListing = (req, res) => { 
    res.render("listings/new.ejs");
  };

  //see specific listing 

  module.exports.SpecificListing = async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id).populate
      ({ path :"reviews" ,
      populate : {path: "author"}}).
      populate("owner");
      if (!listing) {
        req.flash("error", "The listing you are looking for does not exist.");
        return res.redirect("/listings"); 
      }
      console.log(listing);
      res.render("listings/show.ejs", { listing , geoapifyApiKey: process.env.GEOAPIFY_API_KEY});
    };

//add list 

module.exports.addListing = async (req, res, next) => {
  let url =req.file.path;
  let filename = req.file.filename;
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in to create a listing.");
      return res.redirect("/login");
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url , filename}
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};


  //given edit form

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "The listing you are looking for does not exist.");
      return res.redirect("/listings"); 
    }

    let orignelUrl = listing.image.url;
    let orignelImageUrl = orignelUrl.replace("/uploade" , "/uploade/w_250");
    res.render("listings/edit.ejs", { listing,orignelImageUrl});
  };

  
  //edit or update

  module.exports.editListing = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Extract form data
      const updatedData = { ...req.body.listing };
  
      // Update listing with basic fields (title, price, country, category, etc.)
      let listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });
  
      // If a new image is uploaded, update it
      if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
  
        listing.image = { url, filename };
        await listing.save();
      }
  
      req.flash("success", "Successfully updated listing!");
      res.redirect(`/listings/${id}`);
    } catch (err) {
      console.error("Error editing listing:", err);
      req.flash("error", "Something went wrong while editing the listing.");
      res.redirect("/listings");
    }
  };
  

  //delete 

  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteById = await Listing.findByIdAndDelete(id);
    console.log(deleteById);
    req.flash("success" , "Successfully Delete Listing!"); 
    res.redirect("/listings");
  };


// for the serch base on country
module.exports.baseOnCountrySerrchListings = async (req, res) => {
  try {
    console.log("DEBUG: Full req.query =", req.query);
    const { country, category } = req.query;

    let query = {};

    if (country && country.trim() !== "") {
      query.country = { $regex: new RegExp(country.trim(), "i") };
    }

    if (category && category.trim() !== "") {
      query.category = category.trim();
    }

    console.log("DEBUG: Final MongoDB query =", query);

    let allListings = await Listing.find(query);

    if (allListings.length === 0) {
      console.log("DEBUG: No listings found for query:", query);
      req.flash("error", "No Listing Found");
      return res.redirect("/listings");
    }

    res.render("listings/index", { allListings, country: country || "", category });
  } catch (err) {
    console.error("ERROR in baseOnCountrySerrchListings:", err);
    res.status(500).send("Internal Server Error");
  }
};
