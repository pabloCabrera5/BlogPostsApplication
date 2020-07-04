import { useState, useEffect } from 'react'
import getSinglePost from 'services/getSinglePost';

export default function useSinglePost({ postId = 1 } = {}) {

    const [post, setPost] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                let post = await getSinglePost({ id: postId });
                setLoading(false);
                setPost(post);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, [postId])

    return { loading, error, post }
}