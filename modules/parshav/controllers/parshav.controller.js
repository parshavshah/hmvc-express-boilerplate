const path = require("path");
const sendResponse = require("../../../helper/responseHelper.js").sendResponse;
const validate = require("../../../helper/validationHelper").validate;
const getValue = require("../../../helper/constantHelper").getValue;

const parshavModel = require("../models/parshav.model.js");
const { createParshav, updateParshav } = require("../validations/parshav.validation");
const ObjectId = require("mongoose").Types.ObjectId;

const moduleName = path.resolve(__dirname, "..").split(path.sep).reverse()[0].toUpperCase();

exports.create = async (req, res) => {
  try {
    const body = req.body;

    // validation
    await validate(res, createParshav, body, `${moduleName}_CREATE`);

    // database process
    const dbRespnse = await parshavModel.create(body);

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
    const isExists = await parshavModel.countDocuments({ _id: ObjectId(queryId) });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await parshavModel.findOne({ _id: queryId });

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
    await validate(res, updateParshav, body, `${moduleName}_UPDATE`);

    // check id exists
    const isExists = await parshavModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await parshavModel.findOneAndUpdate({ _id: queryId }, body);

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
    const isExists = await parshavModel.countDocuments({ _id: queryId });
    if (!isExists) {
      throw new Error(`${moduleName}_RECORD_NOT_EXISTS`);
    }

    // database process
    const dbRespnse = await parshavModel.findOneAndUpdate({ _id: queryId }, { isDeleted: true });

    // send response
    sendResponse(res, dbRespnse, `${moduleName}_DELETE_SUCCESS`, 200);
  } catch (error) {
    if (!res.isSent) sendResponse(res, error.message, `${moduleName}_DELETE_FAIL`, 500);
  }
};

exports.list = async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : getValue("DEFAULT_PAGE_SIZE");
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : getValue("DEFAULT_PAGE_NUMBER");

    // database process
    const dbRespnse = await parshavModel
      .find()
      .limit(pageSize)
      .skip(pageSize * pageNumber)
      .exec();

    const recordCount = await parshavModel.count();

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
