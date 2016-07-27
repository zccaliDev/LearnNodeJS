var express = require("express");
var http = require("http");
var fs = require("fs")
var Path = require("path");
var nunjucks = require("nunjucks");
var bodyParser = require('body-parser')
var request = require("request");
var flash = require('express-flash');
var sessions = require("express-session");

var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(sessions({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }
));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(Path.join(__dirname, "public")));


app.get("/register", function (req, res) {
    res.render("register.html")
});

app.get("/login", function (req, res) {
    res.render("login.html")
});

var baseUrl = "http://localhost:9000/api";
app.post("/register", function (req, res) {
    request.post(baseUrl + "/users", {
        json: true,
        body: {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
    }, function (err, response, body) {
        if (body.status == "Success") {
            res.redirect("/login")
        } else {
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.post("/login", function (req, res) {
    request.post(baseUrl + "/login", {
        json: true,
        body: {
            email: req.body.email,
            password: req.body.password
        }
    }, function (err, response, body) {
        if (body.status == "Success") {
            req.session.user = body.body
            res.redirect("/")
        } else {
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.use("/", function(req, res, next) {
    if(req.session.user) {
        app.locals.user = req.session.user;
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "accept, cache-control, content-type, x-requested-with, token");
        next();
    }
    else res.redirect("/login")
});
app.get("/", function (req, res) {
    res.render("posts/list.html");
});
app.get("/posts/:id", function (req, res) {
    res.render("posts/find.html");
});
app.get("/create", function (req, res) {
   res.render("posts/create.html")
});
app.post("/create", function (req, res) {
    request.post(baseUrl + "/posts", {
        headers: {
          token: req.session.user.token
        },
        json: true,
        body: {
            title: req.body.title,
            body: req.body.body
        }
    }, function (err, response, body) {
        if (body.status == "Success") {
            res.redirect("/")
        } else {
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.get("/config.js", function (req, res) {
    
    var src = "var User = " + JSON.stringify(req.session.user);
    res.send(src);
})

http.createServer(app).listen(80);