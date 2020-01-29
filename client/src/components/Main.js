import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Details from './Details';

import p1 from '../img/p1.png';
import p2 from '../img/p2.png';
import p3 from '../img/p3.png';
import p4 from '../img/p4.png';
import Mostar from '../img/mostar.jpg';
import Blagaj from '../img/buna.jpg';
import Jajce from '../img/jajce.jpg';
import Rama from '../img/ramsko jezero.jpg';
import Bihac from '../img/bihac.jpg';

class Main extends Component{
	constructor(props) {
		super(props);

		this.state = {
			showDetails: false,
			detailsData: "",
		}

		this.handleViewDetails = this.handleViewDetails.bind(this);
		this.closeViewDetails = this.closeViewDetails.bind(this);
	}

	handleViewDetails = (e, value) => {
		e.preventDefault();
		
			this.setState({
				showDetails: true,
				detailsData: value
			})
	}

	closeViewDetails(e){
		this.setState({
			showDetails: false
		})
	}

	render() {
		return(
			<div className="main">
				{this.state.showDetails && (
					<div className="detailsContainer">
						<Details 
							data={this.state.detailsData}
							close={e => this.closeViewDetails(e)}
						/>
						<div className="ui-widget-overlay" />
					</div>
					)}
				<div className="mainFirst">
				    <div className="shuttle">
						<h1>Sarajevo Shuttle</h1>
						<p>We take you to and from the airport.</p>
						<Link to="/airport" className="btn btn-lg btn-primary">BOOK A RIDE</Link>
					</div>
				</div>
				<div className="mainSecond">
					<h2>Our service:</h2>
					<div className="row">
						
						<div className="col-sm box">
							<Link to="/airport">
								<div className="circle a">
									<i className="fas fa-plane fa-2x"></i>
								</div>
								<h4>Airport Shuttle</h4>
								<p>Transfer from airport or to airport from any locaction.</p>
							</Link>	
						</div>
						

						
						<div className="col-sm box">
						<Link to="/rent">
							<div className="circle b">
								<i className="fas fa-car fa-2x"></i>
							</div>
							<h4>Rent a Car</h4>
							<p>Find the best rental prices on cars. Earn discount on early booking.</p>
						</Link>
						</div>
						

						
						<div className="col-sm box">
						<Link to="/transfers">
							<div className="circle c">
								<i className="fas fa-shuttle-van fa-2x"></i>
							</div>
							<h4>Transfers</h4>
							<p>Easiest way to travel on destination you want.</p>
						</Link>
						</div>
						
					</div>
					
				</div>
				<div className="mainSpecial">
					<div className="mainSpecialHeader">
						<h2>Transfers - Special Offers:</h2>
					</div>
					<div className="mainSpecialMain">
						<div className="row">
							<div className="col-sm boxSpecial">
								<p>Mostar</p>
								<div className="boxSpecialText">
									<img className="img-fluid" src={Mostar} />
									<p>Mostar, Konjic, Buna, Blagaj, Pocitelj</p>
								</div>
								<div className="boxSpecialBtns">
									<button
										onClick={(e) => this.handleViewDetails(e, "Mostar")}
										className="btn btn-primary"
									>
										View Details
									</button>
								</div>
							</div>
							<div className="col-sm boxSpecial">
								<p>Bihac</p>
								<div className="boxSpecialText">
									<img className="img-fluid" src={Bihac} />
									<p>Bihac, Una, Jajce, Nesto Usput</p>
								</div>
								<div className="boxSpecialBtns">
									<button
										onClick={(e) => this.handleViewDetails(e, "Bihac")}
										className="btn btn-primary"
									>
										View Details
									</button>
								</div>
							</div>
							<div className="col-sm boxSpecial">
								<p>Travnik</p>
								<div className="boxSpecialText">
									<img className="img-fluid" src={Jajce} />
									<p>Travnik, Jajce, Vlasic</p>
								</div>
								<div className="boxSpecialBtns">
									<button
										onClick={(e) => this.handleViewDetails(e, "Travnik")}
										className="btn btn-primary"
									>
										View Details
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mainThird">
					<h2>How to use:</h2>
					
					<div className="row">
						<div className="col-sm box">
							<img src={p1} className="img2" />
							<h4>1. Your needs</h4>
							<p>You need transfer to or from airport, want to visit and travel to other towns.</p>
						</div>
						<div className="col-sm box">
							<img src={p2} className="img2" />
							<h4>2. Make a action</h4>
							<p>Provide us with information about places you want to reach and your travel details.</p>
						</div>
						<div className="col-sm box">
							<img src={p3} className="img2" />
							<h4>3. Receive a Offer</h4>
							<p>We will send you best possible deals for your travel.</p>
						</div>
						<div className="col-sm box">
							<img src={p4} className="img2" />
							<h4>4. Accept or Reject</h4>
							<p>After you evaluate our offers you can accept it or reject it.</p>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

export default Main;