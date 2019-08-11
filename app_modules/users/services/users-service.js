const database = require('../models/user');
const getModel = () => database.model();
exports.list = function(filter = {}) {
    return getModel().find(filter);
};