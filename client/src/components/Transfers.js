import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class Transfers extends Component{

	static contextTypes = {
		router: PropTypes.object
	}

	constructor(){
		super()

		this.state = {
			firstName: '',
			//specialOffer: !this.props.location.param1 ? null : this.props.location.param1,
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
			notificationDOMRef: React.createRef()
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value });
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

		 axios.post("shuttle/form", {
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

	render() {
		console.log("Special Offer" ,this.props.location.param1)
		return(
			<div className="transfers">
				<div className="text-transfer">
					<h3>Transfers to any destination in Bosnia and Herzegovina</h3>
					<p><strong>We offer you safe and professional service for traveling and visiting other towns in Bosnia or region.</strong></p>
					{/*<div className="row">
						<div className="col-sm">
							<h6>Mostar</h6>
							<img className="img-3" src={Mostar} />
						</div>
						<div className="col-sm">
							<h6>Blagaj</h6>
							<img className="img-3" src={Blagaj} />
						</div>
						<div className="col-sm">
							<h6>Jajce</h6>
							<img className="img-3" src={Jajce} />
						</div>
						<div className="col-sm">
							<h6>Ramsko Lake</h6>
							<img className="img-3" src={Rama} />
						</div>
					</div>*/}
				</div>
				<form className="transfersForm" onSubmit={this.handleSubmit}>
					<div className="transfersName">
						<div className="transfersFirstName">
							<label for="firstName">First Name</label>
							<input type="text" className="form-control" name="firstName" 
							placeholder="First name" onChange={this.handleChange} />
						</div>
						<div className="transfersLastName">
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
					<div className="form-group transfersInput">
							<label for="InputEmail">Email address</label>
							<input type="email" className="form-control" id="InputEmail" 
							name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
						{this.state.showEmailError && (
							<div className="errorMsg">
								<p>Email is reqiured</p>
							</div>
							)}
					</div>
					<div className="form-group transfersInput">
							<label for="inputDate">Date of travel</label>
							<input type="date" className="form-control" name="date"
							onChange={this.handleChange} id="inputDate" />
						{this.state.showDateError && (
							<div className="errorMsg">
								<p>Date is reqiured</p>
							</div>
							)}
					</div>
					<div className="form-group transfersInput">
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
					<div className="form-group transfersInput">
							<label for="PickUp">Pick Up Address</label>
							<input type="text" className="form-control" id="PickUp" 
							name="firstAddress" placeholder="Pick Up Address" onChange={this.handleChange} />
					</div>
					{this.state.showAddressError && (
						<div className="errorMsg">
							<p>Address is reqiured</p>
						</div>
						)}
					<div className="form-group transfersInput">
							<label for="DropOff">Your Destination</label>
						<input type="text" className="form-control" id="DropOff" name="lastAddress"
							placeholder="Your Destination" onChange={this.handleChange} value={this.props.location.param1 ? this.props.location.param1 : this.state.lastAddress} />
						</div>
					<div className="form-group transfersInput">
							<label for="Select">Round trip:</label>
							<select className="form-control" name="roundTrip" id="Select" onChange={this.handleChange}>
								<option>No</option>
								<option>Yes</option>
							</select>
					</div>
					<div className="form-group transfersInput">
						<label for="phoneNumber">Phone Number</label>
						<input type="number" className="form-control" id="phoneNumber" name="phoneNumber"
							onChange={this.handleChange} placeholder="Your phone number" />
					</div>
					<div className="form-group transfersInput">
						<label for="Textarea1">Message:</label>
						<textarea className="form-control" name="message" id="Textarea1" rows="4" onChange={this.handleChange}></textarea>
					</div>
					<div className="form-group transfersInput">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
				</form>
			</div>
			);
	}
}

export default Transfers;