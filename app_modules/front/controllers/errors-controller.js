exports.notFound = function (req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render(__dirname + '/../views/errors/404');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
};
exports.actionBreak = function (err, req, res, next) {
    res.status(500);
    if (req.accepts('html')) {
        res.render(__dirname + '/../views/errors/500');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: err, message: 'Error in operation' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Error in operation');
};