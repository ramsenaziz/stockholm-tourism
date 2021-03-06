import React, { Component } from 'react'
import AlertDismissable from './AlertDismissable'
import { Button } from 'react-bootstrap'

import './SaveLocationForm.css'

class SaveLocationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            alertMessage: false,
            text: 'Save',
            bgColor: 'primary',
            showForm: 'false'
        };        
      }
    
    onNameChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    onSubmit = (event) => {
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

        this.props.onAddLocation(name);
        this.setState({
            value: '',
            alertMessage: false,
            text: 'Saved!',
            bgColor: 'success',
        })
    }

    onClick = () => {
        this.props.handleToggleForm(this.props.handleToggleForm);
        this.setState({
            show: 'true'
        })
    }

    render() {
        let buttonStyle = this.state.bgColor;
        let buttonText = this.state.text;

        return (
            <div>
                {this.state.alertMessage && 
                    <AlertDismissable 
                        title="Kumpadre, use your imagination." 
                        message="You have to fill in a name to save a location." />
                    }
                {this.state.showForm && 
                    <div className="save-location-container">
                    <button className="close-btn" onClick={this.onClick}>x</button>
                        <form 
                            className="save-location-form" 
                            onSubmit={this.onSubmit}
                        >
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" ref="name" 
                                value={this.state.value} 
                                onChange={this.onNameChange}
                                placeholder="Save this position..."
                                autoFocus/>
                            <Button 
                                bsStyle={buttonStyle} 
                                onClick={this.onSubmit}>{buttonText}
                            </Button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default SaveLocationForm
