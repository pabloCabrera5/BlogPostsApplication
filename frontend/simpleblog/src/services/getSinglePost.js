import axios from 'axios';
import { URL } from './config';

// must call this service within a try catch block to capture the error
export default async function getSinglePost({id = 1} = {}) {
    try {
        let result = await axios.get(`${URL}/posts/${id}`);
        let post = result.data.Results;
        return post;
    } catch (err) {
        throw new Error('No post with specified id');
    }
}