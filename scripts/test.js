const { text } = require("express");

function getTextBox(name, placeholder) {
  return `<input type="text" name="${name}" value="" placeholder="${placeholder}">`;
}

function getEmailBox(name, placeholder) {
  return `<input type="text" name="${name}" value="" placeholder="${placeholder}">`;
}

function getFileBox(name, placeholder) {
  return `<input type="file" name="${name}" value="" placeholder="${placeholder}">`;
}

const myForm = {
  firstName: "text",
  lastName: "text",
  email: "email",
  profilePic: "file",
};

const result = [];

for (const key in myForm) {
  switch (myForm[key]) {
    case "text":
      result.push(getTextBox(key, key));
      break;

    case "email":
      result.push(getEmailBox(key, key));
      break;

    case "file":
      result.push(getFileBox(key, key));
      break;

    default:
      break;
  }
}

console.log(result);
