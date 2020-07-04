import React from 'react';
import './postsList.css';
import Post from '../Post/post';


export default function PostsList({ posts }) {

    return (
        <div data-testid='postlist' className='blogList'>
            {
                posts.map(post => {
                    return (
                        <Post key={post.id} post={post} />
                    )
                })
            }
        </div>
    )
}