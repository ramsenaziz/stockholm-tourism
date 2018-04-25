import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Location.css'

class Location extends Component {
    handleClick = () => {
        this.props.selectLocation(this.props.location);
    }
    render() {
        const name = this.props.location.name;
        return (
            <span 
                className="location" 
                onClick={this.handleClick}>{name}
            </span>
        );
    }
}

Location.propTypes = {
    onClick: PropTypes.func
}

export default Location
