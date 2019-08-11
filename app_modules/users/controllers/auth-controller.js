const repo = require('../services/auth-service');
exports.auth = async function  (req, res) {
    res.json({token: '---'})
};
exports.profile = async function  (req, res) {
    res.json({name: '---'})
};
exports.password = async function  (req, res) {
    res.json({})
};