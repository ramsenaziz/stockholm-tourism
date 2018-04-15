import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveButton from './SaveButton';
import './SaveLocationForm.css'

class SaveLocationForm extends Component {

    onChange = () => {
        console.log('Changing name');
    }

    onSubmit = (event) => {
        event.preventDefault();
        var name = this.refs.name.value.trim();
        
        if(!name) {
            alert('Please enter a name');
            return;
        }

        this.props.onAddLocation(name);
        this.refs.name.value = '';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Name:</label>
                    <input type="text" ref="name" onChange={this.onChange}/>
                    <SaveButton/>
                </form>
            </div>
        );
    }
}

SaveLocationForm.propTypes = {

};

export default SaveLocationForm;
