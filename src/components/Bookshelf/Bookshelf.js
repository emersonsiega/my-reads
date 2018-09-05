import React, { Component } from 'react';
import './Bookshelf.css'

class Bookshelf extends Component {
    render() {
        return(
            <div>
                <h1>{this.props.shelf}</h1>
            </div>
        )
    }
}

export default Bookshelf;