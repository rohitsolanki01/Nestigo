const express = require("express");
const router = express.Router();
const wrapAsync = require("../utills/wrapAsyc.js");
const {isLoggedIn} = require("../middleware.js")
const {isOwner , validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");

const listingController = require("../controller/listing.js");
const { listingSchema } = require("../schema.js");
const { route } = require("./listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })



//index route

router.get('/', wrapAsync(listingController.baseOnCountrySerrchListings));
 // add a listing 
 router.route("/")
.post(
  isLoggedIn,
validateListing,
  upload.single("listing[image][url]"),
  wrapAsync(listingController.addListing)
)


//given form for adding listing 
router.get("/new",isLoggedIn, listingController.renderFormForListing );


router.route("/:id")
  //show route
  .get(
    wrapAsync(listingController.SpecificListing)
  )
     //update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
     validateListing,
      wrapAsync(listingController.editListing)
    )
  //delete listings
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  )
 

  //given edit option to the user
  router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  );


module.exports = router;
  
