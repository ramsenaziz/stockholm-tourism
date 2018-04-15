import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SaveLocationForm.css'
import AlertDismissable from './AlertDismissable'
import Button from 'react-bootstrap/lib/Button'

class SaveLocationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alertMessage: false,
            text: 'Save',
            bgColor: 'primary'
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
            this.setState({
                alertMessage: true,
                text: 'Save',
                bgColor: 'primary'
            })
            return;
        }

        this.props.handleAddLocation(name);
        this.setState({
            value: '',
            alertMessage: false,
            text: 'Saved!',
            bgColor: 'success'
        })
    }

    render() {
        let buttonStyle = this.state.bgColor;
        let buttonText = this.state.text;
        let showAlert = this.state.alertMessage;

        return (
            <div>
                {this.state.alertMessage && 
                <AlertDismissable title="Use your imagination!" message="You have to fill in a name to save a location." />
                }
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input type="text" ref="name" value={this.state.value} onChange={this.handleChange}/>
                    <Button bsStyle={buttonStyle} onClick={this.handleSubmit}>{this.state.text}</Button>
                </form>
            </div>
        );
    }
}

SaveLocationForm.propTypes = {

};

export default SaveLocationForm;
