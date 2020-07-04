import { useState, useEffect } from 'react'
import getPosts from 'services/getPosts';

export default function usePosts() {

    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                let posts = await getPosts();
                setLoading(false);
                setPosts(posts)
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData()
    }, [])

    return { loading, error, posts }
}