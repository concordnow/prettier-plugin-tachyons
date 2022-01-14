const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const plugin = require("..");

const fixture = fs.readFileSync(
  path.join(__dirname, "./__fixtures__/glimmer.fix"),
  "utf-8"
);

function format(content, opts = {}) {
  return prettier.format(content, {
    ...opts,
    parser: "glimmer",
    plugins: [plugin],
  });
}

describe("Test glimmer parser", () => {
  test("basic glimmer component", async () => {
    const formatted = format(fixture);
    expect(formatted).toMatchSnapshot();
  });
});
