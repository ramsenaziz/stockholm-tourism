import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker'
import DeleteButton from './components/DeleteButton'
import SaveLocationForm from './components/SaveLocationForm';
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
        { 
          id: 1,
          name: "Stureplan",
          lat: "59.339832", 
          lng: "18.075802" 
        },
        { 
          id: 2,
          name: "Kungsgatan",
          lat: "59.334409", 
          lng: "18.059047" 
        },
        { 
          id: 3,
          name: "Medborgarplatsen",
          lat: "59.315153", 
          lng: "18.071664" 
        },
      ],
      center: {
        lat: 59.32,
        lng: 18.06
      },
      zoom: 11
    };

    this.focusOnLocation = this.focusOnLocation.bind(this);
  }

  // handleClick(lat, lng) {
  //    console.log(lat, lng);
  //   };

    focusOnLocation() {
        console.log('Clicked');
    }

  render() {

    const locations = this.state.locations;
    const listItems = locations.map((location) =>
      <li key={location.id}><span>{location.name}</span><DeleteButton /></li>
    );

    return (
      <div className="App">
        <div className="main">

          <div className="map-container">
            <GoogleMapReact
              center={this.state.center}
              zoom={this.state.zoom}
              onClick={this.handleClick}
            >
            <Marker
              lat={59.339832}
              lng={18.075802}
              text="Stureplan"
            />
            </GoogleMapReact>
          </div>

          <div className="list-container">
            <h2>Saved Places</h2>
            <ol>
              {listItems}
            </ol>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
