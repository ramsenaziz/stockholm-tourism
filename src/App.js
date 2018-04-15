import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Location from './components/Location'
import Marker from './components/Marker'
import DeleteButton from './components/DeleteButton'
import SaveLocationForm from './components/SaveLocationForm'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };

    this.getCoordinates = this.getCoordinates.bind(this);
  
  }

  getCoordinates = (data) => {
    let lat = data.lat;
    let lng = data.lng;
    console.log('lat: ' + lat);
    console.log('let: ' + lng);

    this.setState({
      currentLat: lat,
      currentLng: lng
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
  
  selectLocation = (location) => {
    this.setState({
      selectedLocation: location
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      locations: this.state.allLocations.filter((location) => new RegExp(event.target.value, "i").exec(location.name))
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
              <SaveLocationForm onAddLocation={this.handleAddLocation}/>

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
            <ol>
            {this.state.locations.map((location) => {
              return <li key={location.id}>
                        <Location 
                          location={location} 
                          selectLocation={this.selectLocation}
                        />
                        <DeleteButton />
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



