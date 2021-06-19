"use strict";

//jshint esversion:6
var express = require("express");

var bodyParser = require("body-parser");

var https = require("https");

var cors = require("cors");

var mongoose = require("mongoose");

var multer = require("multer");

var session = require("express-session");

var passport = require("passport");

var passportLocalMongoose = "passport-local-mongoose";

require("dotenv").config();

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());
console.log("Setting up mongoose"); //Mongoose

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (!err) {
    console.log("success");
  } else {
    console.log("There was an error");
  }
}); //Rename blog scheme

var blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String
  },
  blogImage: {
    type: String
  },
  blogVideo: {
    type: String
  },
  blogContent: {
    type: String
  }
});
var Blog = mongoose.model("Blog", blogSchema); //User database

var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});
var User = mongoose.model("User", userSchema); //Multer

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "../public/images");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-image-" + file.originalname);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(null, false);
      return;
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}); //createBlogy

app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, result) {
    res.send(result);
  });
}); //Single Blog Post

app.get("/register", function (req, res) {
  res.send("Registered Successfully");
});
app.get("/blog/:blogId", function (req, res) {
  console.log(req.params.blogId);
  var id = req.params.blogId;
  Blog.findById(id, function (err, result) {
    res.send(result);
  });
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/createblog", function (req, res) {
  res.render("createblog");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/createblog", upload.single("blogImage"), function (req, res) {
  console.log(req.body);
  res.send("Blog created");
  console.log(req.file.filename);
  var blog = new Blog({
    blogTitle: req.body.blogTitle,
    blogImage: req.file.filename,
    blogContent: req.body.blogContent
  });
  blog.save();
});
app.post("/register", function (req, res) {
  console.log(req.body.email);
  res.send("Registered succesfully");
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  user.save();
}); //Port

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server is running on port 5000");
});