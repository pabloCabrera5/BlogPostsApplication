// postDetailComponent.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import PostDetail from "components/PostDetail/postDetail";
import { POST } from "services/config";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("PostDetail component should render succesful", () => {

    act(() => {
        render(<PostDetail post={POST} />, container);
    });
    
    expect(container.textContent).toBe("New TitleP. Fitscher  -  11/10/2014Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Comments Very interesting, good job - Alfred Fantastic, really love the job!!! - Anonym");
    expect(container.querySelector("h3").textContent).toBe("New Title");
    expect(container.querySelector("p").textContent).toBe("P. Fitscher  -  11/10/2014");
    expect(container.querySelector('[data-testid="content"]').textContent).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    expect(container.querySelectorAll("h3")[1].textContent).toBe("Comments");

});