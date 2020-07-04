import axios from 'axios';
import getSinglePost from 'services/getSinglePost';
import { POST, URL } from 'services/config';

jest.mock('axios');

describe('Fetch single post ', () => {

    it('fetches successfully data from API', async () => {
        let id = 1;
        const data = {
            data: {
                Results: POST
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(getSinglePost({ id })).resolves.toEqual(data.data.Results);
        expect(axios.get).toHaveBeenCalledWith(
            `${URL}/posts/${id}`
        );
    });

    it('fetches erroneously data from API', async () => {
        let id = 1;
        const errorMessage = 'No post with specified id';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(getSinglePost({ id })).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(
            `${URL}/posts/${id}`
        );
    });
});