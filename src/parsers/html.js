const prettierParserHTML = require("prettier/parser-html");

module.exports = () => ({
  ...prettierParserHTML.parsers.html,
  parse(text, parsers, options) {
    const ast = prettierParserHTML.parsers.html.parse(text, parsers, options);

    const cleanElementClasses = (el) => {
      if (el.attrs) {
        const classAttr = el.attrs.find((attr) => attr.name === "class");
        if (classAttr) {
          const classList = classAttr.value
            .split(" ")
            .map((classItem) => classItem.trim())
            .filter((classItem) => classItem.length > 0);
          classAttr.value = ""; // TODO
        }
      }

      if (el.children && el.children.length > 0) {
        el.children.forEach((childEl) => cleanElementClasses(childEl));
      }
    };
    cleanElementClasses(ast);

    return ast;
  },
});
