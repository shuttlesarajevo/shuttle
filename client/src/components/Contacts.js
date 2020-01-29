import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class Contacts extends Component {

	static contextTypes = {
		router: PropTypes.object
	}

	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			message: '',
			phoneNumber: null,
			showFirstNameError: false,
			showLastNameError: false,
			emailError: false,
			showMessageError: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	async handleSubmit(e) {
		const { firstName, lastName, email, message, phoneNumber } = this.state;
		

		if (firstName.trim().length < 1) {
			this.setState({
				showFirstNameError: true,
				showLastNameError: false,
				emailError: false
			})
		} else if (lastName.trim().length < 1) {
			this.setState({
				showLastNameError: true,
				showFirstNameError: false,
				emailError: false
			})
		} else if (email.trim().length < 1) {
			this.setState({
				emailError: true,
				showFirstNameError: false,
				showLastNameError: false,
			})
		} else if (this.state.message.trim().length < 1) {
			this.setState({
				emailError: false,
				showFirstNameError: false,
				showLastNameError: false,
				showMessageError: true
			})
		} else {
			this.setState({
				showFirstNameError: false,
				showLastNameError: false,
				emailError: false,
				showMessageError: false
			})
			
			await this.sendRequest();
			await this.redirect();
		}
	}

	redirect = () => {
		this.context.router.history.push(`/success`);
	}

	sendRequest = () => {
		const { firstName, lastName, email, message, phoneNumber } = this.state;
		
		 axios.post('http://localhost:3006/contacts/form', {
			firstName,
			lastName,
			email,
			message,
			phoneNumber
		});

	}

	render() {
		return (
			<div className="contacts">
				<div className="contactsText">
					<p className="contactsHeader">GET IN TOUCH</p>
					<div className="contactsMain">
						<p>We're social and we'd love to hear from you! Feel free to send us an email, message or call us.</p>
						<a href="tel:+38761524573"><i className="fa fa-phone" aria-hidden="true"></i> +387 61 524 573 </a>
					</div>
				</div>
				<form onSubmit={this.handleSubmit}>
					
					<div className="contactsNames">
						<div className="contactsFirstName">
							<label for="firstName">First Name</label>
							<input type="text" name="firstName" className="form-control"
								placeholder="First Name" onChange={this.handleChange} />
							{this.state.showFirstNameError &&
								(
								<div className="errorMsg">
									<p>First Name is reqiured</p>
								</div>
								)
							}
						</div>
						<div className="contactsLastName">
							<label for="lastName">Last Name</label>
							<input type="text" name="lastName" className="form-control"
								placeholder="Last Name" onChange={this.handleChange} />
							{this.state.showLastNameError &&
								(
									<div className="errorMsg">
										<p>Last Name is reqiured</p>
									</div>
								)
							}
						</div>
					</div>
					<div className="form-group contactsInput">
						<label for="InputEmail">Email address</label>
						<input type="email" name="email" className="form-control"
							id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email"
							onChange={this.handleChange} />
						{this.state.emailError &&
							(
								<div className="errorMsg">
									<p>Email is reqiured</p>
								</div>
							)
						}
					</div>
					<div className="form-group contactsInput">
						<label for="phoneNumber">Phone Number</label>
						<input type="number" className="form-control" id="phoneNumber" name="phoneNumber"
							onChange={this.handleChange} placeholder="Your phone number" />
					</div>
					<div className="form-group contactsInput">
						<label for="Textarea1">Message:</label>
						<textarea className="form-control" name="message" id="Textarea1" rows="4" onChange={this.handleChange}></textarea>
						{this.state.showMessageError && (
							<div className="errorMsg">
								<p>Message is reqiured</p>
							</div>
							)}
					</div>
					<div className="form-group contactsInput">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Contacts;