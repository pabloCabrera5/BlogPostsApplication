// postListComponent.test.js
// In fact this test it not essential as postsList component render only the post component, and this one is the important component to test

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { POSTS } from "services/config";
import PostsList from "components/PostsList/postsList";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // clean when exit
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("PostList component should render succesful", () => {
    act(() => {
        render(<PostsList posts={POSTS} />, container);
    });
    expect(container.textContent).toBe("This is the title 1This post has 2 commentsRead more...New TitleThis post has 2 commentsRead more...Post Title 3This post has 0 commentsRead more...");
    expect(container.querySelectorAll("h3")[0].textContent).toBe("This is the title 1");
    expect(container.querySelectorAll("p")[0].textContent).toBe("This post has 2 comments");
    expect(container.querySelectorAll("a")[0].textContent).toBe("Read more...");
});