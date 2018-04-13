import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

class Map extends Component {
    static defaultProps = {
        center: {
          lat: 59.32,
          lng: 18.06
        },
        zoom: 11
      };
      
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
               
                center={this.props.center}
                zoom={this.props.zoom}
              >
              </GoogleMapReact>
            </div>
        );
    }
}

Map.propTypes = {

};

export default Map;
