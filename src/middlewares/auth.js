const adminAuth = (res, req, next) => {
  const token = "abc";
  if (token == "abc") {
    next();
  } else {
    res.status(401).send("Un-Auth");
  }
};

const userAuth = (req, res, next) => {
  const token = "abc";
  if (token == "abc") {
    next();
  } else {
    res.status(401).send("Un-Authhhh");
  }
};

module.exports = { adminAuth, userAuth };
