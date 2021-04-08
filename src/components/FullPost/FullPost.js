import React, { Component } from 'react';
import axios from "../../Axios";

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedData: null
    }
    componentDidUpdate() {
        if(this.props.id){
            if(!this.state.loadedData || (this.state.loadedData && this.state.loadedData !== this.props.id)){
                 axios
                   .get(
                     "/posts/" +
                       this.props.id
                   )
                   .then((response) => {
                     this.setState({ loadedData: response.data });
                   });
            }
        }
    }

    deleteHandeler = (id) => {
        axios.delete("/posts/" +id)
            .then(response => {
                console.log(response);
                console.log(id);
            })
    }
    
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        
        if(this.props.id){
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }

        if(this.state.loadedData){
            post = (
              <div className="FullPost">
                <h1>{this.state.loadedData.title}</h1>
                <p>{this.state.loadedData.body}</p>
                <div className="Edit">
                  <button
                    className="Delete"
                    onClick={() => this.deleteHandeler(this.props.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
        }
        return post;
    }
}

export default FullPost;