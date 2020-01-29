import React, { Component } from 'react';

class SuccessComponent extends Component {
    render() {
        return (
            <div className="successField">
                <h3>Your request has been sent!</h3>
                <hr />
                <p>We will contact you soon.</p>
            </div>
            );
    }
}

export default SuccessComponent;