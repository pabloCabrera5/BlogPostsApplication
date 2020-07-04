import axios from 'axios';
import { URL } from './config';

// must call this service within a try catch block to capture the error
export default async function getPosts() {
    try {
        let result = await axios.get(`${URL}/posts`);
        let posts = result.data.Results;
        return posts;
    } catch (err) {
        throw new Error('Something went wrong');
    }
}