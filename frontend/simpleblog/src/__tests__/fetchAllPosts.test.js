import axios from 'axios';
import { POSTS, URL } from 'services/config';
import getPosts from 'services/getPosts';

jest.mock('axios');

describe('Fetch all posts ', () => {

    it('fetches successfully data from API', async () => {
        const data = {
            data: {
                Results: POSTS
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(getPosts()).resolves.toEqual(data.data.Results);
        expect(axios.get).toHaveBeenCalledWith(
            `${URL}/posts`
        );
    });

    it('fetches erroneously data from API', async () => {
        const errorMessage = 'Something went wrong';
        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(getPosts()).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(
            `${URL}/posts`
        );
    });
});