import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Location from './components/Location'
import Marker from './components/Marker'
import SaveLocationForm from './components/SaveLocationForm'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Hard coded locations for demonstration purpose
      locations: [
        { 
          id: 1,
          name: "Stureplan",
          lat: 59.339832, 
          lng: 18.075802 
        },
        { 
          id: 2,
          name: "Kungsgatan",
          lat: 59.334409, 
          lng: 18.059047 
        },
        { 
          id: 3,
          name: "Medborgarplatsen",
          lat: 59.315153, 
          lng: 18.071664 
        },
      ],
      allLocations: [
        { 
          id: 1,
          name: "Stureplan",
          lat: 59.339832, 
          lng: 18.075802 
        },
        { 
          id: 2,
          name: "Kungsgatan",
          lat: 59.334409, 
          lng: 18.059047 
        },
        { 
          id: 3,
          name: "Medborgarplatsen",
          lat: 59.315153, 
          lng: 18.071664 
        },
      ],
      selectedLocation: null,
      search: "",
      currentLat: null,
      currentLng: null,
      displayLocationForm: false,
    };

    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates = (data) => {
    const lat = data.lat;
    const lng = data.lng;
    const displayLocationForm = this.state.displayLocationForm;

    this.setState({
      currentLat: lat,
      currentLng: lng,
      displayLocationForm: true
    })
  }
  
  handleAddLocation = (name) => {
    const newLocation = {
      id: this.state.locations.length + 1,
      name: name,
      lat: this.state.currentLat,
      lng: this.state.currentLng
    }
    this.setState({
      locations: this.state.locations.concat(newLocation),
      allLocations: this.state.locations.concat(newLocation)
    })
  }

  handleDeleteLocation = (location) => {
    const locations = this.state.locations;
    for(var i = 0; i < locations.length; i++) {
      if(locations[i].id == location.id){
        locations.splice(i, 1)
      }
    }
    this.setState({
      locations: locations,
      allLocations: locations
    })
  }
  
  selectLocation = (location) => {
    this.setState({
      selectedLocation: location
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      locations: this.state.allLocations.filter((location) => 
        new RegExp(event.target.value, "i").exec(location.name))
    });
  }

  render() {
    let allLocations = this.state.locations;
    let center = {
      lat: 59.32,
      lng: 18.06
    }
    let zoom = 11;

    if (this.state.selectedLocation) {
      center = {
        lat: this.state.selectedLocation.lat,
        lng: this.state.selectedLocation.lng
      }
      zoom = 14;
    }

    return (
      <div className="App">
        <div className="main">
          <div className="map-container">
            <GoogleMapReact
              center={center}
              zoom={zoom}
              onClick={this.getCoordinates}           
            >
              {this.state.displayLocationForm && 
                <SaveLocationForm 
                  handleAddLocation={this.handleAddLocation}/>
              }
              {this.state.locations.map((location) => {
                return <Marker 
                          key={location.id} 
                          lat={location.lat} 
                          lng={location.lng} 
                          text={location.name} 
                          selected={location === this.state.selectedLocation}
                        /> 
                })
              }
            </GoogleMapReact>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch} />
          </div>

          <div className="list-container">
            <h2>Saved Places</h2>
            {this.state.locations.length == 0 && 
              <span>You have no saved locations.</span>
            }
            <ol>
            {this.state.locations.map((location) => {
              return <li key={location.id}>
                        <Location 
                          location={location} 
                          selectLocation={this.selectLocation}
                        />
                        <button 
                          className="delete-button" 
                          onClick={this.handleDeleteLocation.bind(this, location)}>Delete
                        </button>
                      </li>
              })
            }
            </ol>      
          </div>
        </div>
      </div>
    );
  }
}

export default App



