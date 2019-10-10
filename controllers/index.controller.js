const index = (req, res) => {
  res.render("./public/index");
};

const about = (req, res) => {
  res.render("./public/about");
};

module.exports = {
  index,
  about
};
