import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        id: null,
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const newPost = response.data.slice(0,4);
                const updatePost = newPost.map(post => {
                    return {
                        ...post,
                        aurther :'Max'
                    }
                })         
                this.setState({posts: updatePost})
            })
    }
    postIdHandeler = (id) => {
        this.setState({id: id})
    }

    render () {
        const Posts = this.state.posts.map(post => {
            return(
                <Post key={post.id} title={post.title} aurther={post.aurther} postClick={() => this.postIdHandeler(post.id)} />
            ) 
        });

        return (
            <div>
                <section className="Posts">
                    {Posts}
                </section>
                <section>   
                    <FullPost id={this.state.id} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;