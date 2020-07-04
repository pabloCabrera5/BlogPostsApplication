// postComponent.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Post from "components/Post/post";
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
describe('Post Component', () => {
    it("Post component should render succesful", () => {
        act(() => {
            render(<Post post={POST} />, container);
        });
        expect(container.textContent).toBe("New TitleThis post has 2 commentsRead more...");
        expect(container.querySelector("h3").textContent).toBe("New Title");
        expect(container.querySelector("p").textContent).toBe("This post has 2 comments");
        expect(container.querySelector("a").textContent).toBe("Read more...");
        expect(container.querySelector("a").getAttribute("href")).toEqual("/post/2");
    });
})