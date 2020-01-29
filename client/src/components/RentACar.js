import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


class RentACar extends Component{

	static contextTypes = {
		router: PropTypes.object
	}

	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			startDate: '',
			endDate: '',
			carType: 'Economic',
			firstAddress: '',
			lastAddress: '',
			driveBh: '',
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
		this.setState({ [ e.target.name ] : e.target.value });
	}

	async handleSubmit(e){
		e.preventDefault()

		const { firstName, lastName, email, startDate, endDate, carType, firstAddress, lastAddress, driveBh, message, phoneNumber } = this.state;

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
		} else if (!startDate || !endDate) {
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
		const { firstName, lastName, email, startDate, endDate, carType, firstAddress, lastAddress, driveBh, message, phoneNumber } = this.state;
		axios.post('rent/form', {
			firstName,
			lastName,
			email,
			startDate,
			endDate,
			carType,
			firstAddress,
			lastAddress,
			driveBh,
			message,
			phoneNumber
		})
	}

	redirect = () => {
		this.context.router.history.push(`/success`);
	}

	render() {
		console.log(this.state.carType)
		return(
			<div className="rent">
				<div className="text-rent">
					
					<h3>Rent A Car</h3>
					<p><strong>Best deals for rental cars in Sarajevo.</strong></p>
					
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="rentName">
						<div className="rentFirstName">
							<label for="firstName">First Name</label>
							<input type="text" className="form-control" name="firstName" 
							placeholder="First name" onChange={this.handleChange} />
						</div>
						<div className="rentLastName">
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
						<div className="form-group rentInputs">
							<label for="InputEmail">Email address</label>
							<input type="email" className="form-control" id="InputEmail" 
							name="email" aria-describedby="emailHelp" onChange={this.handleChange} placeholder="Enter email" />
						{this.state.showEmailError && (
							<div className="errorMsg">
								<p>Email is reqiured</p>
							</div>
							)}
						</div>
					<div className="row rentInputs">
						<div className="col-sm">
								<label for="dateFrom">Start Date</label>
								<input type="date" className="form-control" name ="startDate" 
								onChange={this.handleChange} id="dateFrom" />
							</div>
						<div className="col-sm">
								<label for="dateTo">End Date</label>
								<input type="date" className="form-control" name="endDate"
								onChange={this.handleChange} id="dateTo" />
							</div>
					</div>
					{this.state.showDateError && (
						<div className="errorMsg">
							<p>Date is reqiured</p>
						</div>
						)}
					<div className="form-group rentInputs">
    						<label for="FormSelect">Type of car</label>
    						<select className="form-control" name="carType" onChange={this.handleChange} id="FormSelect">
      							<option>Economic</option>
      							<option>Compact</option>
      							<option>Limousine</option>
      							<option>Luxury</option>
      							<option>Van</option>
    						</select>
  						</div>
					<div className="form-group rentInputs">
							<label for="PickUp">Pick Up Address</label>
							<input type="text" className="form-control" name="firstAddress" onChange={this.handleChange} id="PickUp" placeholder="Pick Up Address" />
					</div>
					{this.state.showAddressError && (
						<div className="errorMsg">
							<p>Address is reqiured</p>
						</div>
						)}
					<div className="form-group rentInputs">
							<label for="DropOff">Drop Off Address</label>
							<input type="text" className="form-control" id="DropOff" name="lastAddress" 
							onChange={this.handleChange} placeholder="Your Destination" />
						</div>
					<div className="form-group rentInputs">
							<label for="driveBh">Will you use car outside of B&H?</label>
							<select className="form-control" name="driveBh" onChange={this.handleChange} id="driveBh">
								<option>Yes</option>
								<option>No</option>
							</select>
					</div>
					<div className="form-group rentInputs">
						<label for="phoneNumber">Phone Number</label>
						<input type="number" className="form-control" id="phoneNumber" name="phoneNumber"
							onChange={this.handleChange} placeholder="Your phone number" />
					</div>
					<div className="form-group rentInputs">
						<label for="Textarea1">Message:</label>
						<textarea className="form-control" name="message" id="Textarea1" rows="4" onChange={this.handleChange}></textarea>
					</div>
					<div className="form-group rentInputs">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
				</form>
			</div>
			);
	}
}

export default RentACar;