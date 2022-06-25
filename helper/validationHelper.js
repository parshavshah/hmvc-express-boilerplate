const sendResponse = require("./responseHelper.js").sendResponse;

exports.validate = async (req, schema, body) => {
  await schema
    .validateAsync(body, {
      abortEarly: false,
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      error.details = error.details.map((e) => {
        return e.message;
      });
      sendResponse(req, error.details, "VALIDATION_ERROR", 500);
    });
};
