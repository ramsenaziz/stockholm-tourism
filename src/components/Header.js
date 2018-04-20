import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div>
            <a href="#header-container">
                <div>
                    <h1>Stockholm Tourism</h1>
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Stockholm_vapen_bra.svg/2000px-Stockholm_vapen_bra.svg.png" 
                    alt="Stockholm Tourism" 
                    with="33" 
                    height="33"/>
                </div>
            </a>

            <nav>
                <ul>
                    <li><a href="https://www.visitstockholm.com/" target="_blank" rel="noopener noreferrer">Visit</a></li>
                    <li><a href="#search">Search</a></li>
                </ul>
            </nav>
        </div>
    )
  }
}
