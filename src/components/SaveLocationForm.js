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
            bgColor: 'success',
        })
    }

    handleClick = () => {
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
                    <button className="close-btn" onClick={this.handleClick}>x</button>
                        <form 
                            className="save-location-form" 
                            onSubmit={this.handleSubmit}
                        >
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" ref="name" 
                                value={this.state.value} 
                                onChange={this.handleChange}
                                placeholder="Type in a name..."
                                autoFocus/>
                            <Button 
                                bsStyle={buttonStyle} 
                                onClick={this.handleSubmit}>{buttonText}
                            </Button>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default SaveLocationForm
