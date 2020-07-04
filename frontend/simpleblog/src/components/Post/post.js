import React from 'react';
import './post.css';
import { Link } from 'wouter';

export default function Post({ post }) {

    return (
        <div key={post.id} className='post'>
            <h3>{post.title}</h3>
            <p>This post has {post.comments ? post.comments.length : 0} comments</p>
            <Link to={`/post/${post.id}`}>Read more...</Link>
        </div>
    )
}