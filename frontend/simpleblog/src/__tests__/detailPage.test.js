
// Detail page tests

import React from 'react';
import ReactDOM from 'react-dom';
import Detail from "pages/Detail";

import {act, render, fireEvent, cleanup, waitForElement} from '@testing-library/react';

import axiosMock from "axios";
import { POST, URL } from 'services/config';

beforeEach(cleanup)
afterEach(cleanup)

it('Detail page render succesful', async () => {
    let postId = 1;
    axiosMock.get.mockResolvedValue({data: { Results: POST } })

    const { getByText, getByTestId, rerender } = render(<Detail params={{postId}} />);

    expect(getByText(/Loading post.../i).textContent).toBe("Loading post...") 

    const displayedPost = await waitForElement(() => getByTestId("title"));
    expect((displayedPost).textContent).toBe("New Title");
    expect(getByText(/Go Back/i).textContent).toBe("Go Back") 

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(`${URL}/posts/${postId}`);
    axiosMock.get.mockClear();

})
it('Detail page render doesnt find any post', async () => {
    let postId = 7;
    axiosMock.get.mockImplementationOnce(() => Promise.reject(new Error('Error fetching')));

    const { getByText,getByTestId, container } = render(<Detail params={{postId}} />);

    expect(getByText(/Loading post.../i).textContent).toBe("Loading post...") 

    const elementError = await waitForElement(() => getByTestId("errordetail"));
    
    expect((elementError).textContent).toBe("Sorry, there is no post matching this id.") 
    
    expect(axiosMock.get).toHaveBeenCalledTimes(1); 
    expect(axiosMock.get).toHaveBeenCalledWith(`${URL}/posts/${postId}`);
})
