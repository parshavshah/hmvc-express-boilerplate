var fs = require("fs");
var path = require("path");

function createModuleDirectory(moduleName) {
  if (!fs.existsSync(`./modules/${moduleName}`)) {
    fs.mkdirSync(`./modules/${moduleName}`);
  }
  if (!fs.existsSync(`./modules/${moduleName}/controllers`)) {
    fs.mkdirSync(`./modules/${moduleName}/controllers`);
  }
  if (!fs.existsSync(`./modules/${moduleName}/models`)) {
    fs.mkdirSync(`./modules/${moduleName}/models`);
  }
  if (!fs.existsSync(`./modules/${moduleName}/routes`)) {
    fs.mkdirSync(`./modules/${moduleName}/routes`);
  }
  if (!fs.existsSync(`./modules/${moduleName}/validations`)) {
    fs.mkdirSync(`./modules/${moduleName}/validations`);
  }
}

function createModuleFiles(moduleName) {
  if (!fs.existsSync(`./modules/${moduleName}/controllers/${moduleName}.controller.js`)) {
    fs.writeFileSync(`./modules/${moduleName}/controllers/${moduleName}.controller.js`, "");
  }
  if (!fs.existsSync(`./modules/${moduleName}/models/${moduleName}.model.js`)) {
    fs.writeFileSync(`./modules/${moduleName}/models/${moduleName}.model.js`, "");
  }
  if (!fs.existsSync(`./modules/${moduleName}/routes/${moduleName}.route.js`)) {
    fs.writeFileSync(`./modules/${moduleName}/routes/${moduleName}.route.js`, "");
  }
  if (!fs.existsSync(`./modules/${moduleName}/validations/${moduleName}.validation.js`)) {
    fs.writeFileSync(`./modules/${moduleName}/validations/${moduleName}.validation.js`, "");
  }
}

function toTitleCase(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function copyModuleCode(moduleName) {
  // controller code
  if (fs.existsSync(`./modules/${moduleName}/controllers/${moduleName}.controller.js`)) {
    let mainData = fs.readFileSync("./scripts/blueprint/controllers/blueprint.controller.js", { encoding: "utf-8" });
    mainData = mainData.split("blueprint").join(moduleName);
    mainData = mainData.split("Blueprint").join(toTitleCase(moduleName));
    fs.writeFileSync(`./modules/${moduleName}/controllers/${moduleName}.controller.js`, mainData);
  }

  // models code
  if (fs.existsSync(`./modules/${moduleName}/models/${moduleName}.model.js`)) {
    let mainData = fs.readFileSync("./scripts/blueprint/models/blueprint.model.js", { encoding: "utf-8" });
    mainData = mainData.split("blueprint").join(moduleName);
    mainData = mainData.split("Blueprint").join(toTitleCase(moduleName));
    fs.writeFileSync(`./modules/${moduleName}/models/${moduleName}.model.js`, mainData);
  }

  // routes code
  if (fs.existsSync(`./modules/${moduleName}/routes/${moduleName}.route.js`)) {
    let mainData = fs.readFileSync("./scripts/blueprint/routes/blueprint.route.js", { encoding: "utf-8" });

    mainData = mainData.split("blueprint").join(moduleName);
    mainData = mainData.split("Blueprint").join(toTitleCase(moduleName));
    fs.writeFileSync(`./modules/${moduleName}/routes/${moduleName}.route.js`, mainData);
  }

  // routes code
  if (fs.existsSync(`./modules/${moduleName}/validations/${moduleName}.validation.js`)) {
    let mainData = fs.readFileSync("./scripts/blueprint/validations/blueprint.validation.js", { encoding: "utf-8" });
    mainData = mainData.split("blueprint").join(moduleName);
    mainData = mainData.split("Blueprint").join(toTitleCase(moduleName));
    fs.writeFileSync(`./modules/${moduleName}/validations/${moduleName}.validation.js`, mainData);
  }
}

const givenModuleName = process.argv.slice(2)[0];

createModuleDirectory(givenModuleName);
createModuleFiles(givenModuleName);
copyModuleCode(givenModuleName);
