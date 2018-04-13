import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SaveButton from './SaveButton';
import './SaveLocationForm.css'

class SaveLocationForm extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <input type="text" placeholder="Type in name..."/>
                    <SaveButton />
                </form>
            </div>
        );
    }
}

SaveLocationForm.propTypes = {

};

export default SaveLocationForm;
