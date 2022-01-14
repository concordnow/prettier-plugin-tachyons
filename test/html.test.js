const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const plugin = require("..");

const fixture = fs.readFileSync(
  path.join(__dirname, "./__fixtures__/html.fix"),
  "utf-8"
);

function format(content, opts = {}) {
  return prettier.format(content, {
    ...opts,
    parser: "html",
    plugins: [plugin],
  });
}

describe("Test HTML parser", () => {
  test("basic html page", async () => {
    const formatted = format(fixture);
    expect(formatted).toMatchSnapshot();
  });
});
