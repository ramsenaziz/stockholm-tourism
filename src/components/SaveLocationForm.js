import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SaveLocationForm.css'

class SaveLocationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var name = this.refs.name.value.trim();
        
        if(!name) {
            alert('Please enter a name');
            return;
        }

        this.props.handleAddLocation(name);
        this.refs.name.value = '';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" ref="name" value={this.state.value} onChange={this.handleChange}/>
                <button className="save-button">Save</button>
            </form>
        );
    }
}

SaveLocationForm.propTypes = {

};

export default SaveLocationForm;
