import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import './PatientDetails.css';

class ViewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            sNo: 0,
            amount: 3000,
            action: 'Click to pay'
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/getPatientDetails')
            .then(response => response.json())
         //   .then(data => console.log("ddddddddd" + JSON.stringify(data)))
            .then(data => this.setState({ data:data }));
    }

    render() {
        return (
            <div>
                <h3 style={{ color: '#1E90FF' }}>View Appointment</ h3>
                <hr style={{ border: '0.5px solid #1E90FF' }}></hr>
                <Grid container spacing={0} xs={12}>
                    <Grid item xs={0}>
                        <label htmlFor="text" style={{ marginTop: '10px'}}>From Date</label> </Grid>
                    <Grid item xs={2}>
                        <input type="date" name="from"
                            value="2021-03-02"
                            className="date-input"
                            placeholder="DD/MM/YYYY.." />

                    </Grid>
                    <Grid item xs={0}>
                        <label htmlFor="text">To Date</label> </Grid>
                    <Grid item xs={2}>
                        <input type="date" name="to"
                            value="2021-03-02"
                            className="date-input"
                            placeholder="DD/MM/YYYY.." />

                    </Grid>
                    <Grid item xs={0}>
                        <label htmlFor="text">Status</label> </Grid>
                    <Grid item xs={2}>
                            <select name="billing">
                                <option value="Fully Billed">Fully Billed</option>
                                <option value="Not Yet Billed">Not Yet Billed</option>
                                <option value="Due Billed">Due Billed</option>
                            </select>
                        </Grid>
                        <Grid item xs={1}>
                        <label htmlFor="text">Common Search</label> </Grid>
                        <Grid item xs={2}>
                        <input type="text" name="search"
                                value=""/>
                        </Grid>
                        <Grid item xs={1}>
                        <input type="button" name="search"
                                value="search"/>
                        </Grid>
                </Grid>
                <div className="card mt-50">
                    <table className="table">
                        <thead>
                            <tr className="table">
                                <th className="table-header">Sno</th>
                                <th className="table-header">Patient Name</th>
                                <th className="table-header">Age - Gender</th>
                                <th className="table-header">Appointment Date</th>
                                <th className="table-header">Balance Amount</th>
                                <th className="table-header">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign: 'center'}}>
                            {this.state.data && this.state.data.map((item) => (
                                <tr>
                                    <td>{this.state.sNo+1}</td>
                                    <td>{item.patientName}</td>
                                    <td>{item.age} - {item.gender}</td>
                                    <td>{item.appointment.substring(0,10)}</td>
                                    <td>{this.state.amount}</td>
                                    <td>{this.state.action}</td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewAppointment;