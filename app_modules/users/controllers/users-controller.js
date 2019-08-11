const repo = require('../services/users-service');
const { paginateResponse } = require('@app/helper');
exports.list = async function  (req, res) {
    res.json(await paginateResponse(repo.list()))
};