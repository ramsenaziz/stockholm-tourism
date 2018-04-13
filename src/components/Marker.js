import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Marker.css'

class Marker extends Component {
    render() {
        return (
            <div className="marker">
                {this.props.text}
            </div>
        );
    }
}

Marker.propTypes = {

}

export default Marker
