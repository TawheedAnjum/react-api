import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedDate: null
    }
    componentDidUpdate() {
        if(this.props.id){
            if(!this.state.loadedDate || (this.state.loadedDate && this.state.loadedDate.id=!this.state.loadedDate.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' +this.props.id)
                .then((response) => {
                    this.setState({loadedDate: response.data})
                })
            }
        }
    }
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedDate.title}</h1>
                    <p>Content</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;