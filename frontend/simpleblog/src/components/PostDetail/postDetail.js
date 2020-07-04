import React from 'react';
import './postDetail.css';


export default function PostDetail({ post }) {

    return (
        <div className='postDetail'>

            <div key={post.id} className='postContent'>
                <h3 data-testid='title'>{post.title}</h3>
                <p>{post.author}  -  {post.date}</p>
                <p data-testid='content' >{post.content}</p>
            </div>
            <div className='postComment' >
                <h3>Comments</h3>
                <ul>
                    {post.comments?.map(comment => {
                        return <li key={comment.id}> {comment.text} - {comment.name || 'Anonym'}</li>
                    })}
                </ul>
            </div>

        </div>
    )
}