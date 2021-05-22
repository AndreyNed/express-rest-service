const defaultHttpErrorHandler = (e, res) => {
  const { status = 500, message = 'Server error' } = e || {};

  res.status(status).send(message);
};

module.exports = defaultHttpErrorHandler;
