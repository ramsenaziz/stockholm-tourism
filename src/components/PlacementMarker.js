import React, { Component } from 'react'

import './Marker.css'

export default class PlacementMarker extends Component {
    render() {
        return (
            <div className="marker selected">
                <span>{this.props.text}</span>
            </div>
        );
    }
}
