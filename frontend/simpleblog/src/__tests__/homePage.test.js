
// Home Page test homePage.test.js

import React from 'react';
import ReactDOM from 'react-dom';

import {act, render, cleanup, waitForElement} from '@testing-library/react';

import axiosMock from "axios";
import { URL, POSTS } from 'services/config';
import Home from 'pages/Home';

beforeEach(cleanup)
afterEach(cleanup)

it('Home page render succesful', async () => {
    axiosMock.get.mockResolvedValue({data: { Results: POSTS } })

    const { getByText, getByTestId, rerender } = render(<Home />);

    expect(getByText(/Loading post.../i).textContent).toBe("Loading posts...") 

    const postsList = await waitForElement(() => getByTestId("postlist"));
    expect(postsList).toBeVisible();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(`${URL}/posts`);

})
it('Home page render doesnt find any post', async () => {

    axiosMock.get.mockImplementationOnce(() => Promise.reject(new Error('Error fetching')));

    const { getByText, getByTestId } = render(<Home />);

    expect(getByText(/Loading post.../i).textContent).toBe("Loading posts...") 

    const elementError = await waitForElement(() => getByTestId("errordetail"));    
    expect((elementError).textContent).toBe("Sorry, there is no posts.") 
    
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(axiosMock.get).toHaveBeenCalledWith(`${URL}/posts`);
    axiosMock.get.mockClear();

})
