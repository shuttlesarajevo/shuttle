import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class Shuttle extends Component{

	static contextTypes = {
		router: PropTypes.object
	}

	constructor(){
		super()

		this.state ={
			firstName: '',
			lastName: '',
			email: '',
			date: '',
			passangers: '',
			firstAddress: '',
			lastAddress: '',
			roundTrip: '',
			message: '',
			phoneNumber: null,
			showNameError: false,
			showEmailError: false,
			showDateError: false, 
			showAddressError: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value })
	}

	async handleSubmit(e) {
		e.preventDefault()

		const { firstName, lastName, email, date, passangers, firstAddress, lastAddress, roundTrip, message, phoneNumber } = this.state;

		if (firstName.trim().length < 1 || lastName.trim().length < 1) {
			this.setState({
				showNameError: true,
				showEmailError: false,
				showDateError: false,
				showAddressError: false
			})
		} else if (email.trim().length < 1) {
			this.setState({
				showNameError: false,
				showEmailError: true,
				showDateError: false,
				showAddressError: false
			})
		} else if (!date) {
			this.setState({
				showNameError: false,
				showEmailError: false,
				showDateError: true,
				showAddressError: false
			})
		} else if (firstAddress.trim().length < 1 || lastAddress.trim().length < 1) {
			this.setState({
				showNameError: false,
				showEmailError: false,
				showDateError: false,
				showAddressError: true
			})
		} else {

			this.setState({
				showNameError: false,
				showEmailError: false,
				showDateError: false,
				showAddressError: false
			})


			await this.sendRequest();
			await this.redirect();
		}
	}

	sendRequest = () => {
		const { firstName, lastName, email, date, passangers, firstAddress, lastAddress, roundTrip, message, phoneNumber } = this.state;

		axios.post('shuttle/form', {
			firstName,
			lastName,
			email,
			date,
			passangers,
			firstAddress,
			lastAddress,
			roundTrip,
			message,
			phoneNumber
		})
	}

	redirect = () => {
		this.context.router.history.push(`/success`);
	}

	render(){
		return(
			<div className="airport">
				<div className="text-airport ">
					
					<h3>Sarajevo Airport Transfer</h3>
					<p><strong>Book your transfer for comfortable transfer to and from airport.</strong></p>
				  
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="airportName">
						<div className="airportFirstName">
							<label for="firstName">First Name</label>
							<input type="text" className="form-control" name="firstName"
							 placeholder="First name" onChange={this.handleChange} />
						</div>
						<div className="airportLastName">
							<label for="lastName">Last Name</label>
							<input type="text" className="form-control" name="lastName"
							placeholder="Last name" onChange={this.handleChange} />
						</div>
					</div>
					{this.state.showNameError && (
						<div className="errorMsg">
							<p>Name is reqiured</p>
						</div>
					)}
					<div className="form-group airpotInputs">
							<label for="InputEmail">Email address</label>
							<input type="email" className="form-control" id="InputEmail" 
							name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
						{this.state.showEmailError && (
							<div className="errorMsg">
								<p>Email is reqiured</p>
							</div>
							)}
						</div>
					<div className="form-group airpotInputs">
							<label for="inputDate">Date of arrival</label>
							<input type="date" className="form-control" name="date" 
							id="inputDate" onChange={this.handleChange} />
						{this.state.showDateError && (
							<div className="errorMsg">
								<p>Date is reqiured</p>
							</div>
							)}
						</div>
					<div className="form-group airpotInputs">
    						<label for="FormSelect">Number of passangers</label>
    						<select className="form-control" name="passangers" id="FormSelect" onChange={this.handleChange}>
      							<option>1</option>
      							<option>2</option>
      							<option>3</option>
      							<option>4</option>
      							<option>5</option>
      							<option>6</option>
      							<option>7</option>
      							<option>8</option>
    						</select>
  						</div>
					<div className="form-group airpotInputs">
							<label for="PickUp">Pick Up Address</label>
							<input type="text" className="form-control" id="PickUp" 
							name="firstAddress" placeholder="Pick Up Address" onChange={this.handleChange} />
					</div>
					{this.state.showAddressError && (
						<div className="errorMsg">
							<p>Address is reqiured</p>
						</div>
						)}
					<div className="form-group airpotInputs">
							<label for="DropOff">Drop Off Address</label>
							<input type="text" className="form-control" id="DropOff" name="lastAddress"
							placeholder="Your Destination" onChange={this.handleChange} />
						</div>
					<div className="form-group airpotInputs">
							<label for="Select">Round trip:</label>
							<select className="form-control" name="roundTrip" id="Select" onChange={this.handleChange}>
								<option>Yes</option>
								<option>No</option>
							</select>
					</div>
					<div className="form-group airpotInputs">
						<label for="phoneNumber">Phone Number</label>
						<input type="number" className="form-control" id="phoneNumber" name="phoneNumber"
							onChange={this.handleChange} placeholder="Your phone number" />
					</div>
					<div className="form-group airpotInputs">
						<label for="Textarea1">Message:</label>
						<textarea className="form-control" name="message" id="Textarea1" rows="4" onChange={this.handleChange}></textarea>
					</div>
					<div className="form-group airpotInputs">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
				</form>
			</div>
			);
	}
}

export default Shuttle;