import React, { Component } from 'react'
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

export default Marker
