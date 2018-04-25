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
import { DB_CONFIG } from './Config/config'
import firebase from 'firebase/app'
import 'firebase/database'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('locations');

    this.state = {
      locations: [],
      selectedLocation: null,
      search: '',
      currentLat: null,
      currentLng: null,
      displayLocationForm: false,
      placementMarkerText: 'Hello',
    };
    
    this.state.allLocations = this.state.locations.slice();
  }

  componentWillMount = () => {
    const previousLocations = this.state.locations;
    
    // DataSnapshot
    this.database.on('child_added', snap => {
      previousLocations.push({
        id: snap.key,
        name: snap.val().name,
        lat: snap.val().lat,
        lng: snap.val().lng,
      })

      this.setState({
        locations: previousLocations,
        allLocations: previousLocations
      })
    })

    this.database.on('child_removed', snap => {
      for(var i = 0; i < previousLocations.length; i++) {
        if(previousLocations[i].id === snap.key) {
          previousLocations.splice(i, 1)
        }
      }

      this.setState({
        loctions: previousLocations
      })
    })
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
  
  // Add item to database
   onAddLocation = (name) => {
    this.database.push().set({
      name: name,
      lat: this.state.currentLat,
      lng: this.state.currentLng
    })
  }

  // Delete list item from database
  onDeleteLocation = (location) => {
    this.database.child(location).remove();
  }
  
  // Pass props value to Marker component so it renders selected listitem
  selectLocation = (location) => {
    this.setState({
      selectedLocation: location,
      placementMarkerText: ''
    });
  }

  // Change inputfield value and filter out listitems
  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      locations: this.state.allLocations.filter((location) => 
        new RegExp(e.target.value, "i").exec(location.name))
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
              {
                this.state.locations.length === 0 && 
                <div className="message-container">
                  <span id="message">Can not find any saved location.</span>
                </div> 
              }
              <ListGroup>
                {this.state.locations.map((location) => {
                  return <ListGroupItem key={location.id}    
                          >
                            <a href="#map-container">
                              <Location 
                                location={location} 
                                selectLocation={this.selectLocation} />
                            </a> 
                            <Button 
                              bsStyle='warning'
                              onClick={() => this.onDeleteLocation(location.id)}>Delete
                            </Button>
                          </ListGroupItem>
                  })
                }
              </ListGroup>
            </div>      
          </div>

          <div className="information-container">
            <Information />
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
