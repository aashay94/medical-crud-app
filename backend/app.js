var express = require("express");
var app = express();
var port = 4000;
const cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/patient-details");

var nameSchema = new mongoose.Schema({
    salution: String,
    patientName: String,
    gender: String,
    dob: Date,
    age: Number,
    appointment: Date,
    phone: Number,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    country: String,
});

var Patient = mongoose.model("Patient", nameSchema);
 
app.get("/", (req, res) => {
 res.send("Hello World");
});

app.post("/addPatient", (req, res) => {
    console.log("in backend"+req.body);
    var myData = new Patient(req.body);
    myData.save()
        .then(item => {
            res.send("Patient details saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});