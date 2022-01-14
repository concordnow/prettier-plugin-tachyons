const glimmer = require("./glimmer");
const html = require("./html");

module.exports = () => ({
  glimmer: glimmer(),
  html: html(),
});
