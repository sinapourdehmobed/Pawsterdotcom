
var axios = require("axios");

jest.mock("axios");

// ...

test("good response", () => {
    axios.get.mockImplementation(() => Promise.resolve({}));
    // ...
});

test("bad response", () => {
    axios.get.mockImplementation(() => Promise.reject({}));
    // ...
});