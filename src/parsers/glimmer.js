const prettierParserGlimmer = require("prettier/parser-glimmer");

module.exports = () => ({
  ...prettierParserGlimmer.parsers.glimmer,
  parse(text, parsers, options) {
    const ast = prettierParserGlimmer.parsers.glimmer.parse(
      text,
      parsers,
      options
    );

    const cleanElementClasses = (el) => {
      if (el.attributes) {
        // class="foo bar"
        const classAttr = el.attributes.find((attr) => attr.name === "class");
        if (!classAttr) {
          return;
        }

        switch (classAttr.value.type) {
          case "TextNode": // class="foo bar"
            classAttr.value.chars = ""; // TODO
            break;
          case "MustacheStatement": // class={{'foo bar'}}
            console.log(classAttr.value);

            for (const p of classAttr.value.params) {
              if (p.type === "StringLiteral") {
                p.value = ""; // TODO
              }
            }
            break;
          case "ConcatStatement": // class="foo {{'foo bar'}}"
            console.log(classAttr.value);
            break;
        }
      }

      if (el.children && el.children.length > 0) {
        el.children.forEach((childEl) => cleanElementClasses(childEl));
      }
    };
    ast.body.map((el) => cleanElementClasses(el));

    return ast;
  },
});
