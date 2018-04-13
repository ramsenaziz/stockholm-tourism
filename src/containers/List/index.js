import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteButton from '../../components/DeleteButton'
import './List.css'

class List extends Component {
    render() {
        return (
            <div>
                <h2>Saved Places</h2>
                <ol>
                    <li><span>Stureplan</span><DeleteButton /></li>
                    <li><span>Olof Palmesgata</span><DeleteButton /></li>
                    <li><span>Kungsgatan</span><DeleteButton /></li>
                    <li><span>Drottningatan</span><DeleteButton /></li>
                </ol>
            </div>
        );
    }
}

List.propTypes = {

};

export default List;
