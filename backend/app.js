//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose")
require("dotenv").config();

const app = express(); 


app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  maxAge: 246060*1000
}));

app.use(cookieParser(""));
app.use(passport.initialize());
app.use(passport.session());


console.log("Setting up mongoose");


//Mongoose
mongoose.connect(process.env.MONGODB_URI, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true}, (err) => {
        if (!err) {
            console.log("success")
        } else {
            console.log("There was an error")
        }
    });

    
//Rename blog scheme
const blogSchema = new mongoose.Schema ({
    blogTitle: {
        type: String
    },
    blogImage: {
        type: String
    },
    blogVideo: {
        type:String
    },
    blogAuthor: {
        type:String
    },
    blogContent:{
        type: String
    }}
);

const Blog = mongoose.model("Blog", blogSchema);




//User database

const userSchema = new mongoose.Schema ({
    email: {
        type:String
    },

    username: {
        type:String
    },
    password: {
        type:String
    },
    userRole: {
        type:String
    }
    
});

userSchema.plugin(passportLocalMongoose);


const User =  mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Multer

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../public/images");
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+"-image-"+file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||  
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/jpeg" 
            || file.mimetype === "video/mp4") {
        cb(null, true);
        } else {
        cb(null, false);
        return 
        cb(new Error
            ('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//createBlogy



app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, result){
      res.send(result);
    });
  });

//Single Blog Post

app.get("/register", (req, res) => {
    res.send("Registered Successfully");
   
})

app.get("/blog/:blogId", function(req,res){
    console.log(req.params.blogId);
   var id = req.params.blogId;
    Blog.findById(id, function (err, result) {
        res.send(result);
    });
    
});



app.get("/contact", (req, res)=> {
    res.render("contact")
});


app.get("/createblog", (req, res) => {
    res.render("createblog")
})

app.get("/login", (req, res)=> {
    res.render("login")
})



app.post("/createblog", upload.single("blogImage"), function(req, res){
    console.log(req.body);
      res.send("Blog created");
    console.log(req.file.filename);
   
  
    const blog = new Blog({
       blogTitle: req.body.blogTitle,
       blogImage: req.file.filename,
       blogAuthor: req.body.blogAuthor,
        blogContent: req.body.blogContent
      
      });
     blog.save();
  });

  app.post("/register", function(req, res){
    console.log(req.body);
      res.send("Registered succesfully");
    
   let userEmail = req.body.email;
   let userUsername = req.body.username;
   let userPassword = req.body.password;
  
    const user = new User({
       email: userEmail,
       username: userUsername,
        password: userPassword
      
      });
     user.save();

     
  }); 

  app.post("/user-register", function(req, res){
    console.log(req.body);
    User.register({username: req.body.username, active: false}, req.body.password, function(err, user) {
        if (err) { 
            console.log(err);
        }
        else{
            var authenticate = User.authenticate();
            authenticate(req.body.username, req.body.password, function(err, result) {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(result);
                }
  
                // Value 'result' is set to false. The user could not be authenticated since the user is not active
            });
            res.send("Successfully Registered")
        }
    });
  });
  
  app.post("/login", function(req, res, next){
    console.log(req.body);


    var logStatus = {
        message:"",
        auth:"",
        userRole: ""
      };
    passport.authenticate("local", (err, user, info)=>{
      if(err) throw err;
      if(!user) {
        res.send("User not found");
      }
      else{
        req.login(user, err=>{
          if(err) throw err;

          var user =req.user;
          logStatus.message= "Successfully authenticated";
          logStatus.userRole = user.userRole;
          //logStatus.userRole = "This is a role"
          logStatus.auth = req.sessionID;

          console.log(user.userRole);
           res.send(logStatus);
        });
      }
    })(req, res, next);

  });

  //Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running on port 5000");
})