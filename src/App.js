import React, { Component } from 'react'
import Map from './containers/Map'
import Marker from './components/Marker'
import List from './containers/List'
import SaveLocationForm from './components/SaveLocationForm';
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
        <List />
        <SaveLocationForm />
        <Marker text="Stureplan" />
      </div>
    );
  }
}

export default App;
