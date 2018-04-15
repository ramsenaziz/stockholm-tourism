import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'

class AlertDismissable extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleDismiss = this.handleDismiss.bind(this);
      this.handleShow = this.handleShow.bind(this);
  
      this.state = {
        show: true
      };
    }
  
    handleDismiss() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      if (this.state.show) {
        return (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>{this.props.title}</h4>
            <p>
              {this.props.message}
            </p>
            <p>
              <Button onClick={this.handleDismiss}>Hide Alert</Button>
            </p>
          </Alert>
        );
      }
      return <Button onClick={this.handleShow}>Show Alert</Button>
    }
  }
  
 export default AlertDismissable;
