import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Marker.css'

class Marker extends Component {
    render() {
        let classes = "marker";
        if (this.props.selected) {
            classes += " selected";
        }
        return (
            <div className={classes}>
                <span>{this.props.text}</span>
            </div>
        );
    }
}

Marker.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
}

export default Marker
