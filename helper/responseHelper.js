exports.sendResponse = (res, data, message, code, options = {}) => {
  const responseObject = {
    data: data,
    message: message,
    code: code,
    ...options,
  };

  res.code = code;
  res.status(code);
  res.isSent = true;
  res.send(responseObject);
};
