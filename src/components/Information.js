import React, { Component } from 'react'

export default class Information extends Component {
  render() {
    return (
          <div>
            <h2>Welcome to Stockholm Tourism</h2>
            <ul>
                <li>Use ⌘ + scroll to Zoom the map and drag and drop to find your location.</li>
                <li>Click the map and save your location name.</li>
                <li>You can filter your locations list by typing in the name in the search bar.</li>
                <li>You can delete your saved locations by clicking the delete button.</li>
            </ul>         
          </div>
    )
  }
}
