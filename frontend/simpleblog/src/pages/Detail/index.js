
import React from 'react';
import './index.css';

import PostDetail from 'components/PostDetail/postDetail';
import { Link } from 'wouter';
import useSinglePost from 'hooks/useSinglePost';

export default function Detail({ params } = {}) {

    let { postId } = params;
    const { loading, error, post } = useSinglePost({ postId })

    if (loading) return <p>Loading post...</p>
    if (error) return <p data-testid='errordetail'>Sorry, there is no post matching this id.</p>

    return (
        <>
            <Link className='goBack' to='/'>Go Back</Link>
            {
                post ?
                    <PostDetail post={post} />
                    : null
            }
        </>
    );

}