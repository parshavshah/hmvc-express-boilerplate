const path = require("path");
const sendResponse = require("../../../helper/responseHelper.js").sendResponse;
const validate = require("../../../helper/validationHelper").validate;

const blueprintModel = require("../models/blueprint.model.js");
const { createBlueprint, updateBlueprint } = require("../validations/blueprint.validation");
const ObjectId = require("mongoose").Types.ObjectId;

const moduleName = path.resolve(__dirname, "..").split(path.sep).reverse()[0].toUpperCase();

exports.create = async (req, res) => {
  try {
    const body = req.body;

    // validation
    await validate(res, createBlueprint, body, `${moduleName}_CREATE`);

    // database process
    const dbRespnse = await blueprintModel.create(body);

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
    const isExists = await blueprintModel.countDocuments({ _id: ObjectId(queryId) });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await blueprintModel.findOne({ _id: queryId });

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
    await validate(res, updateBlueprint, body, `${moduleName}_UPDATE`);

    // check id exists
    const isExists = await blueprintModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await blueprintModel.findOneAndUpdate({ _id: queryId }, body);

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
    const isExists = await blueprintModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await blueprintModel.findOneAndUpdate({ _id: queryId }, { isDeleted: true });

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
    const dbRespnse = await blueprintModel
      .find()
      .limit(pageSize)
      .skip(pageSize * pageNumber)
      .exec();

    const recordCount = await blueprintModel.count();

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
