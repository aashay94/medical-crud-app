import React, { Component } from "react";
import './PatientDetails.css';
import MedicalTable from "./MedicalTable";
import Grid from '@material-ui/core/Grid';
//mockdata
var medical = [
    {
        id: 1,
        medicalBilling: "CT BRAIN",
        amount: 2000,
        maxDiscount: 100,
        modality: "CT"
    },
    {
        id: 2,
        medicalBilling: "CT PNS",
        amount: 1000,
        maxDiscount: 200,
        modality: "CT"
    },
    {
        id: 3,
        medicalBilling: "MRI BRAIN",
        amount: 3000,
        maxDiscount: 300,
        modality: "MRI"
    },
    {
        id: 4,
        medicalBilling: "MRI PNS",
        amount: 2400,
        maxDiscount: 30,
        modality: "MRI"
    },
    {
        id: 5,
        medicalBilling: "GLUCOSE FASTING",
        amount: 130,
        maxDiscount: 10,
        modality: "LAB"
    },
    {
        id: 6,
        medicalBilling: "SUGAR TESTING",
        amount: 300,
        maxDiscount: 5,
        modality: "LAB"
    }
];

class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: '',
            dob: '',
            age: '',
            gender: '',
            salutation: 'Select',
            appointment: '',
            phoneNumber: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            country: 'Select Country',
            medicalData: medical,
            formErrors: {}
        };
        this.initialState = this.state;
    }

    handleFormValidation() {
        const { patientName, dob, salutation, phoneNumber, country, age, street1, street2, city, state, appointment, zip } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Patient name     
        if (!patientName) {
            formIsValid = false;
            formErrors["patientNameErr"] = "Name is required.";
        }

        if (!street1) {
            formIsValid = false;
            formErrors["streetErr"] = "Street is required.";
        }

        if (!city) {
            formIsValid = false;
            formErrors["cityErr"] = "City is required.";
        }

        if (!zip) {
            formIsValid = false;
            formErrors["zipErr"] = "Zip is required.";
        }

        if (!street2) {
            formIsValid = false;
            formErrors["streetErr2"] = "Street2 is required.";
        }

        if (!state) {
            formIsValid = false;
            formErrors["stateErr"] = "State is required.";
        }

        if (!appointment) {
            formIsValid = false;
            formErrors["appointmentErr"] = "Appointment is required.";
        }

        if (!age) {
            formIsValid = false;
            formErrors["ageErr"] = "Age is required.";
        }

        //DOB    
        if (!dob) {
            formIsValid = false;
            formErrors["dobErr"] = "Date of birth is required.";
        }
        else {
            var pattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
            console.log(dob);
            if (!pattern.test(dob)) {
                formIsValid = false;
                formErrors["dobErr"] = "Invalid date of birth";
            }
        }

        //Salutation    
        if (salutation === '' || salutation === "select") {
            formIsValid = false;
            formErrors["salutationErr"] = "Select salutation.";
        }

        //Phone number    
        if (!phoneNumber) {
            formIsValid = false;
            formErrors["phoneNumberErr"] = "Phone number is required.";
        }
        else {
            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
            if (!mobPattern.test(phoneNumber)) {
                formIsValid = false;
                formErrors["phoneNumberErr"] = "Invalid phone number.";
            }
        }

        //Country    
        if (country === '' || country === "Select Country") {
            formIsValid = false;
            formErrors["countryErr"] = "Select Country.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    salutionChange = (e) => {
        if (e.target.value === "select") {
            this.setState({ gender: '' });
        }
        if (e.target.value === "mr") {
            this.setState({ gender: 'Male' });
        }
        if (e.target.value === "mrs") {
            this.setState({ gender: 'Female' });
        }
        if (e.target.value === "ms") {
            this.setState({ gender: 'Female' });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert("Hi");
        if (this.handleFormValidation()) {
            let databody = {
                "salutation": this.state.salutation,
                "patientName": this.state.patientName,
                "gender": this.state.gender,
                "dob": this.state.dob,
                "age": this.state.age,
                "appointment": this.state.appointment,
                "phone": this.state.phoneNumber,
                "street1": this.state.street1,
                "street2": this.state.street2,
                "city": this.state.city,
                "state": this.state.state,
                "zip": this.state.zip,
                "country": this.state.country
            }

            fetch('http://localhost:4000/addPatient', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => console.log(data));
        alert('You have been successfully registered.')
        this.setState(this.initialState)
    }
}

render() {

    const { patientNameErr, dobErr, salutationErr, phoneNumberErr, countryErr, ageErr, streetErr, streetErr2, cityErr, stateErr, appointmentErr, zipErr } = this.state.formErrors;

    return (
        <div className="formDiv">
            <h3 style={{ color: '#1E90FF' }}>Patient Details</ h3>
            <hr style={{ border: '0.5px solid #1E90FF' }}></hr>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} xs={8}>
                        <Grid item xs={2}>
                            <label htmlFor="patientName" style={{ marginTop: 20 }}>Patient name</label> </Grid>
                        <Grid item xs={4}>
                            <select name="salutation"
                                onChange={this.salutionChange}
                                className={salutationErr ? ' showError' : ''}
                            >
                                <option value="select">Select</option>
                                <option value="mr">Mr.</option>
                                <option value="mrs">Mrs.</option>
                                <option value="ms">Ms.</option>
                            </select>

                            {salutationErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{salutationErr}</div>
                            }
                            <input type="text" name="patientName"
                                value={this.state.patientName}
                                onChange={this.handleChange}
                                placeholder=""
                                className={patientNameErr ? ' showError' : ''} />
                            {patientNameErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{patientNameErr}</div>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <label htmlFor="gender">Gender</label>
                            <input type="radio" value="Male" name="gender" checked={this.state.gender == 'Male' ? "checked" : ""} /> Male
                            <input type="radio" value="Female" name="gender" checked={this.state.gender == 'Female' ? "checked" : ""} /> Female
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}>
                            <label htmlFor="text">DOB</label> </Grid>
                        <Grid item xs={4}>
                            <input type="date" name="dob"
                                value={this.state.dob}
                                onChange={this.handleChange}
                                placeholder="DD/MM/YYYY.."
                                className={dobErr ? ' showError date-input' : 'date-input'} />
                            {dobErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{dobErr}</div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <label htmlFor="age">Age</label>
                            <input type="text" name="age"
                                value={this.state.age}
                                onChange={this.handleChange}
                                placeholder=""
                                className={ageErr ? ' showError' : ''} />
                            {ageErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{ageErr}</div>
                            }
                            <select name="years" onChange={this.handleChange}
                                className={salutationErr ? ' showError' : ''}
                                value={this.state.age} >
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                                <option value="days">Days</option>
                            </select>
                        </Grid>
                        {/* <Grid item xs={2}></Grid>    */}
                        <Grid item xs={2}>
                            <label htmlFor="text">Appointment Date</label>
                        </Grid>
                        <Grid item xs={4}>
                            <input type="date" name="appointment"
                                value={this.state.appointment}
                                onChange={this.handleChange}
                                placeholder="DD/MM/YYYY.."
                                className={appointmentErr ? ' showError date-input' : 'date-input'} />
                            {appointmentErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{appointmentErr}</div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" name="phoneNumber"
                                onChange={this.handleChange}
                                value={this.state.phoneNumber}
                                placeholder="Your phone number.."
                                className={phoneNumberErr ? ' showError' : ''} />
                            {phoneNumberErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{phoneNumberErr}</div>
                            }
                        </Grid>
                        {/* <Grid item xs={2}></Grid>  */}
                        <Grid item xs={2}>
                            <label htmlFor="address">Address</label>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="text" name="street1"
                                value={this.state.street1}
                                onChange={this.handleChange}
                                placeholder="Street Address"
                                className={streetErr ? ' showError input-width' : 'input-width'} />
                            {streetErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{streetErr}</div>
                            }
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <input type="text" name="street2"
                                value={this.state.street2}
                                onChange={this.handleChange}
                                placeholder="Street Address 2"
                                className={streetErr2 ? ' showError input-width' : 'input-width'} />
                            {streetErr2 &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{streetErr2}</div>
                            }
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <input type="text" name="city"
                                value={this.state.city}
                                onChange={this.handleChange}
                                placeholder="City"
                                className={cityErr ? ' showError input-width' : 'input-width'} />
                            {cityErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <input type="text" name="state"
                                value={this.state.state}
                                onChange={this.handleChange}
                                placeholder="State / Province"
                                className={stateErr ? ' showError input-width' : 'input-width'} />
                            {stateErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{stateErr}</div>
                            }
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <input type="text" name="zip"
                                value={this.state.zip}
                                onChange={this.handleChange}
                                placeholder="Postal / Zip Code"
                                className={streetErr ? ' showError input-width' : 'input-width'} />
                            {streetErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{zipErr}</div>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <select name="country"
                                value={this.state.country}
                                onChange={this.handleChange}
                                className={countryErr ? ' showError input-width' : 'input-width'} >
                                <option value="Select Country">Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Argentina">Argentina</option>
                                <option value="UK">UK</option>
                                <option value="Germany">Germany</option>
                                <option value="Ireland">Ireland</option>
                            </select>
                            {countryErr &&
                                <div style={{ color: "red", paddingBottom: 10 }}>{countryErr}</div>
                            }
                        </Grid>
                    </Grid>
                    <MedicalTable medical={this.state.medicalData} >
                    </MedicalTable>
                    <div style={{ textAlign: "center" }}>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div >
    )
}    
}

export default PatientDetails;