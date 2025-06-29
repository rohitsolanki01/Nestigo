 if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
 }
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverRide = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utills/expressError.js");
const session = require("express-session")
const MongoStore = require('connect-mongo');
const  flash = require('connect-flash');

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");
const { log } = require('console');
const Listing = require("./models/listing.js");
const Booking = require("./models/booking.js");
const { appendFile } = require('fs');
const { isLoggedIn } = require('./middleware.js');

const db_Url = process.env.MONGO_ATLAS_DB


const store = MongoStore.create({
  mongoUrl : db_Url,
  crypto : {
    secret : process.env.SECRET 
  },
  touchAfter : 24 * 3600,
})

store.on("error" , () => {
  console.log("ERROR IN MNAGO SESSTION SESSSION",err)
})

const sessionConfig = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    exprires : Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  }
}

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverRide("_method"));
app.engine("ejs", ejsMate);



async function main() {
  mongoose.connect(db_Url, {
    serverSelectionTimeoutMS: 5000, 
  tls: true,
  tlsAllowInvalidCertificates: false, 
  tlsCertificateKeyFile: null, 
  });
  
}
main()
  .then((res) => {
    console.log("mongoDb connnected");
  })
  .catch((err) => {
    console.log(err);
  });


  
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");  
  res.locals.currentUser = req.user; 
  next(); 
});


app.get("/", async (req, res) => {
  try {
      const allListings = await Listing.find({}); 
      
      res.render("listings/index.ejs", { allListings });
  } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).render("error", { message: "Unable to load listings" });
  }
});

app.get("/user/:id" ,async   (req,res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  const listings = await Listing.find({ owner: user }).populate("owner");
  res.render("users/profile.ejs" , {user , listings});
})

app.get("/user/:id/listings" , async (req,res) => {
      let {id } =req.params;
      let user = await User.findById(id);
      const userListings = await Listing.find({ owner: user }).populate("owner");
    res.render("users/userListings.ejs" , {user , userListings});
})

app.get("/booking/:ListingId", async(req,res) => {
  if(!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to book a listing");
    return res.redirect("/login");
  }
  
  try {
    let { ListingId } = req.params;
    let listing = await Listing.findById(ListingId);
    if(!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    res.render("booking/booking.ejs", {listing});
  } catch(err) {
    console.error(err);
    req.flash("error", "Error loading booking page");
    res.redirect("/listings");
  }
});

app.post("/listings/:id/booking",async(req, res) => {
  try {
    const listingId = req.params.id;
    const guestId = req.user._id;

    const { checkIn, checkOut } = req.body;

    const newBooking = new Booking({
      listingId,
      guestId,
      checkIn,
      checkOut,
      paymentStatus: "pending",
    });

    const savedBooking = await newBooking.save();

    console.log(savedBooking);

    req.flash("success", "Booking successfully booked");

    res.redirect(`/listings/${listingId}`);
  } catch (err) {
    res.status(500).json({ error: "Booking failed", details: err.message });
  }
});


app.get("/user/:listingId/booking", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  try {
    const bookings = await Booking.find({ guestId: req.user._id })
      .populate("listingId"); 
    res.render("users/userBooking.ejs", { bookings, user: req.user });
  } catch (err) {
    console.error(err);
    res.send("Error loading profile");
  }
});

app.delete("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId);

    req.flash("success", "Booking cancelled successfully.");
    res.redirect(`/user/${bookingId }/booking`); // redirect after delete
  } catch (error) {
    console.error("Error deleting booking:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("users/userBooking.ejs");
  }
});



app.use("/listings" , listingsRouter);

app.use("/listings/:id/reviews" ,reviewsRouter);



app.use("/" , userRouter)


app.get("/privacy" , (req,res) => {
  res.render("more/privacy.ejs");
})

app.get("/terms" , (req,res) => {
  res.render("more/terms.ejs");
})


app.all(/.*/, (req, res, next) => {
  next(new expressError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
    res.render("listings/error.ejs" , {message})
});



app.listen(8080, () => {
  console.log(`server is running on 8080`);
});
