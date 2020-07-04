import React from 'react';
import PostsList from 'components/PostsList/postsList';
import usePosts from 'hooks/usePosts';

export default function Home() {

    const { loading, error, posts } = usePosts();

    if (loading) return <p>Loading posts...</p>
    if (error) return <p data-testid='errordetail'>Sorry, there is no posts.</p>

    return (
        <>
            {
                posts ?
                    <PostsList posts={posts} />
                    : null
            }
        </>
    );

}