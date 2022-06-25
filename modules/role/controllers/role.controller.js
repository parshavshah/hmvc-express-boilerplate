const path = require("path");
const sendResponse = require("../../../helper/responseHelper.js").sendResponse;
const validate = require("../../../helper/validationHelper").validate;

const roleModel = require("../models/role.model.js");
const { createRole, updateRole } = require("../validations/role.validation");
const ObjectId = require("mongoose").Types.ObjectId;

const moduleName = path.resolve(__dirname, "..").split(path.sep).reverse()[0].toUpperCase();

exports.create = async (req, res) => {
  try {
    const body = req.body;

    // validation
    await validate(res, createRole, body, `${moduleName}_CREATE`);

    // database process
    const dbRespnse = await roleModel.create(body);

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_CREATE_SUCCESS`, 200);
  } catch (error) {
    if (!res.isSent) sendResponse(res, error, `${moduleName}_CREATE_FAIL`, 500);
  }
};

exports.read = async (req, res) => {
  try {
    const queryId = req.params.id;

    // check id exists
    const isExists = await roleModel.countDocuments({ _id: ObjectId(queryId) });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await roleModel.findOne({ _id: queryId });

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_READ_SUCCESS`, 200);
  } catch (error) {
    if (!res.isSent) sendResponse(res, error.message, `${moduleName}_READ_FAIL`, 500);
  }
};

exports.update = async (req, res) => {
  try {
    const queryId = ObjectId(req.params.id);
    const body = req.body;

    // validation
    await validate(res, updateRole, body, `${moduleName}_UPDATE`);

    // check id exists
    const isExists = await roleModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await roleModel.findOneAndUpdate({ _id: queryId }, body);

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_UPDATE_SUCCESS`, 200);
  } catch (error) {
    if (!res.isSent) sendResponse(res, error.message, `${moduleName}_UPDATE_FAIL`, 500);
  }
};

exports.delete = async (req, res) => {
  try {
    const queryId = ObjectId(req.params.id);

    // check id exists
    const isExists = await roleModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await roleModel.findOneAndUpdate({ _id: queryId }, { isDeleted: true });

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_DELETE_SUCCESS`, 200);
  } catch (error) {
    if (!res.isSent) sendResponse(res, error.message, `${moduleName}_DELETE_FAIL`, 500);
  }
};

exports.list = async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 2;
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;

    // database process
    const dbRespnse = await roleModel
      .find()
      .limit(pageSize)
      .skip(pageSize * pageNumber)
      .exec();

    const recordCount = await roleModel.count();

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_LIST_SUCCESS`, 200, {
      totalRecords: recordCount,
      pageSize,
      pageNumber,
    });
  } catch (error) {
    if (!res.isSent) sendResponse(res, error.message, `${moduleName}_LIST_FAIL`, 500);
  }
};
