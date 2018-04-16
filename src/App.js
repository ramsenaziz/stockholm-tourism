import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Location from './components/Location'
import Marker from './components/Marker'
import SaveLocationForm from './components/SaveLocationForm'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Hard coded locations for demonstration purpose
      locations: [
        { 
          id: 1,
          name: 'Svampen',
          lat: 59.339832, 
          lng: 18.075802 
        },
        { 
          id: 2,
          name: 'Kungsgatan',
          lat: 59.334409, 
          lng: 18.059047 
        },
        { 
          id: 3,
          name: 'Söder',
          lat: 59.315153, 
          lng: 18.071664 
        },
        { 
          id: 4,
          name: 'Kumpan',
          lat: 59.316145, 
          lng: 18.028862 
        }
      ],
      allLocations: [
        { 
          id: 1,
          name: 'Svampen',
          lat: 59.339832, 
          lng: 18.075802 
        },
        { 
          id: 2,
          name: 'Kungsgatan',
          lat: 59.334409, 
          lng: 18.059047 
        },
        { 
          id: 3,
          name: 'Söder',
          lat: 59.315153, 
          lng: 18.071664 
        },
        { 
          id: 4,
          name: 'Kumpan',
          lat: 59.316145, 
          lng: 18.028862 
        }
      ],
      selectedLocation: null,
      search: "",
      currentLat: null,
      currentLng: null,
      displayLocationForm: null,
    };

    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates = (data) => {
    const lat = data.lat;
    const lng = data.lng;

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
      displayLocationForm: false,
      locations: this.state.locations.concat(newLocation),
      allLocations: this.state.locations.concat(newLocation),
    })
  }

  handleDeleteLocation = (location) => {
    const locations = this.state.locations;
    for(var i = 0; i < locations.length; i++) {
      if(locations[i].id === location.id){
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

          <div className="header-container" id="header-container">
            <h1>Stockholm Tourism</h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Stockholm_vapen_bra.svg/2000px-Stockholm_vapen_bra.svg.png" 
              alt="Stockholm Tourism" 
              with="33" 
              height="33"/>
              <nav>
                <ul>
                  <li><a href="#header-container">Home</a></li>
                  <li><a href="#search">Search</a></li>
                </ul>
              </nav>
          </div>

          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyCR177pvGQ5_0vKL6wSGr7P6zfudKb4rfI'}}
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

          <div className="information-container">
            <h2>Welcome to Stockholm Tourism</h2>
            <ul>
                <li>Use ⌘ + scroll to Zoom the map and drag and drop to find your location.</li>
                <li>Then Click the map and save your location name.</li>
                <li>You can filter your locations by typing in the name in the search bar.</li>
                <li>You can delete your saved locations by pressing the delete button.</li>
            </ul>         
          </div>

          <div className="search-container">
            <div className="search" id="search">
              <input
                type="text"
                placeholder="Search your saved places..."
                value={this.state.search}
                onChange={this.handleSearch} />
            </div>
          </div>

          <div className="list-container">
            <div className="list">
              {this.state.locations.length === 0 && 
                <div className="message-container">
                  <span id="message">Sorry! Can not find any saved location Kumpano.</span>
                </div> 
              }
              <ListGroup>
              {this.state.locations.map((location) => {
                return <ListGroupItem key={location.id} href="#">
                          <Location 
                            location={location} 
                            selectLocation={this.selectLocation}
                          />
                          <Button 
                            bsStyle="warning"
                            onClick={this.handleDeleteLocation.bind(this, location)}>Delete
                          </Button>
                        </ListGroupItem>
                })
              }
              </ListGroup>
            </div>      
          </div>

          <div className="footer-container">
            <nav>
              <ul>
                <li>Site created by <a href="http://ramsen.se/">@ramsenaziz</a></li>
                <li><a href="#header-container">Back to top</a></li>
              </ul>
          </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default App
