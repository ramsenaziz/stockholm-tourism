import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Marker.css'

class Marker extends Component {
    render() {
        return (
            <div>
                <span className="marker-text">{this.props.text}</span>
            </div>
        );
    }
}

Marker.propTypes = {

}

export default Marker
