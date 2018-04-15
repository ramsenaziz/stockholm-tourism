import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './DeleteButton.css'

class DeleteButton extends Component {
    render() {
        return (
            <button className="delete-button">Delete</button>
        );
    }
}

DeleteButton.propTypes = {

};

export default DeleteButton
