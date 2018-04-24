import React, { Component } from 'react'
import Header from './components/Header'
import GoogleMapReact from 'google-map-react'
import Location from './components/Location'
import Information from './components/Information'
import Footer from './components/Footer'
import PlacementMarker from './components/PlacementMarker'
import Marker from './components/Marker'
import SaveLocationForm from './components/SaveLocationForm'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      locations: [ // Hard coded for demo purposes.
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
      search: '',
      currentLat: null,
      currentLng: null,
      displayLocationForm: false,
      placementMarkerText: 'Hello',
    };

   this.state.allLocations = this.state.locations.slice();
  }

  // Click on map to save lat & lng position. Display save form. Add text to map marker.
  onMapClick = (data) => {
    const placementMarkerText = `Lat: ${data.lat}, Lng: ${data.lng}`; 
    const lat = data.lat;
    const lng = data.lng;

    this.setState({
      currentLat: lat,
      currentLng: lng,
      displayLocationForm: true,
      placementMarkerText: placementMarkerText
    })
  }

  // Concat new location item to locations and allLocations array
  onAddLocation = (name) => {
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

  // Delete list item in locations and allLocations array
  onDeleteLocation = (location) => {
    const locations = this.state.locations;
    for(var i = 0; i < locations.length; i++) {
      if(locations[i].id === location.id) {
        locations.splice(i, 1)
      }
    }
    this.setState({
      locations: locations,
      allLocations: locations
    })
  }
  
  // Pass props value to Marker component so it renders selected listitem
  selectLocation = (location) => {
    this.setState({
      selectedLocation: location,
      placementMarkerText: ''
    });
  }

  // Change inputfield value and filter out listitems
  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      locations: this.state.allLocations.filter((location) => 
        new RegExp(event.target.value, "i").exec(location.name))
    });
  }

  // Passing down method to SearchForm.js so the state of displayLocationForm is equal to appstate
  handleToggleForm = () => {
    this.setState({ 
      displayLocationForm: false
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
        <div className="main-container">

          <div className="header-container">
            <Header />
          </div>

          {this.state.displayLocationForm && 
            <div className="save-location-form-container">
              <SaveLocationForm 
                onAddLocation={this.onAddLocation}
                handleToggleForm={this.handleToggleForm}/>
            </div>    
          }

          <div className="map-container" id="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyCR177pvGQ5_0vKL6wSGr7P6zfudKb4rfI'}}
              center={center}
              zoom={zoom}
              onClick={this.onMapClick}           
            >
              <PlacementMarker 
                lat={this.state.currentLat} 
                lng={this.state.currentLng} 
                text={this.state.placementMarkerText} />
              
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
            <Information />
          </div>

          <div className="search-container">
            <div className="search" id="search">
              <input
                type='text'
                placeholder='Search your saved places...'
                value={this.state.search}
                onChange={this.handleSearch} />
            </div>
          </div>

          <div className="list-container">
            <div className="list">
              {this.state.locations.length === 0 && 
                <div className="message-container">
                  <span id="message">Sorry! Can not find any saved location Kumpadre.</span>
                </div> 
              }
              <ListGroup>
                {this.state.locations.map((location) => {
                  return <ListGroupItem 
                            key={location.id} 
                          >
                            <a href="#map-container">
                              <Location 
                              location={location} 
                              selectLocation={this.selectLocation} />
                            </a> 
                            <Button 
                              bsStyle='warning'
                              onClick={this.onDeleteLocation.bind(this, location)}>Delete
                            </Button>
                          </ListGroupItem>
                  })
                }
              </ListGroup>
            </div>      
          </div>

          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App
