import React from 'react';
import { Link } from 'react-router-dom';
import Blagaj from '../img/buna.jpg';
import Konjic from '../img/konjic.jpg';
import Pocitelj from '../img/pocitelj.jpg';
import Rama from '../img/ramsko jezero.jpg';
import Travnik from '../img/travnik.jpg';
import Una from '../img/una.jpg';

let mostar = [
    { "name" : "One day trip.... start at morning" },
    { "name": "Visiting famous Jablanica Lamb restaurants(optional)" },
    { "name": "Visiting Konjic" },
    { "name": "Visiting Hiden Tito's Bunker Museum(optional)" },
    { "name": "Visiting Mostar" },
    { "name": "Visit Dervish's House and Buna Spring" },
    { "name": "Visit Pocitelj Medivial Town(Optional)" },
    { "name": "Visit Medjugorije Santa Maria dela Salute (optional)" },
    { "name": "Visit Pocitelj Medivial Town(Optional)" },
    { "name": "Neretva Valley" },
    { "name": "Rafting Neretva (possible for extra day)" }
];

let mostarPictures = [
    Blagaj, Konjic, Pocitelj, Rama
];

let bihacPictures = [
    Una
];

let travnikPictures = [
    Travnik
];

let bihac = [
    { "name": "Bihac" },
    { "name": "Una" }
];

let travnik = [
    { "name": "Travnik" },
    { "name": "Ivo Andric Museum" },
    { "name": "Jajce"}
];

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostar: mostar,
            bihac: bihac,
            travnik: travnik,
            bookedTour: ''
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = (e) => {
        e.preventDefault();

         this.props.close(e)
    }


    render() {
        let linkUrl = {
            pathname: '/transfers',
            param1: this.props.data  +" Special Offer"
        };
        let data = [];
        let pictures = []
        if (this.props.data === "Mostar") {
            data = this.state.mostar
            pictures = mostarPictures
        } if (this.props.data === "Bihac") {
            data = this.state.bihac
            pictures = bihacPictures
        } if (this.props.data === "Travnik") {
            data = this.state.travnik
            pictures = travnikPictures
        }

        return (
            <div className="detailsPopup">
                <div className="detailsHeader">
                    <p>{this.props.data}{" "} Tour</p>
                </div>
                <div className="detailsMain row">
                    <div className="detailsDetails col-sm">
                        <ul>
                            {data.map(item => {
                                return (
                                    <li>{item.name}</li>
                                    );
                            })}
                        </ul>
                    </div>
                    <div className="detailsPictures col-sm">
                        {pictures.map(picture => {
                            return (
                                <div className="row">
                                    <div className="col-xs-12">
                                        <img className="img-fluid" src={picture} />
                                    </div>
                                </div>
                                );
                        })}
                    </div>
                </div>
                <div className="detailsBtns">
                    <button
                        className="btn btn-primary"
                        onClick={(e) => this.handleClose(e)}
                    >
                        Close
                        </button>
                    <button
                        className="btn btn-primary"
                        
                    ><Link to={linkUrl}> Book Tour </Link>
                        </button>
                </div>
            </div>
            );
    }
}

export default Details;