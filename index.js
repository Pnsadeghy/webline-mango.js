require('dotenv').config();
require('module-alias/register');
const express = require("@node/express");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const database = require('@app/database');
const middleware = require('@app/middlewares');
const { getModules } = require('@app/helper');

/////////////////////////////////// database
(async () => {
    await database.init();
})().catch(err => {
    console.log('mango error', err);
    process.exit();
});


/////////////////////////////////// app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    name: process.env.REDIS_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        client: redisClient,
        ttl: process.env.REDIS_TTL
    })
}));
app.set('view engine', 'ejs');

/////////////////////////////////// routing
// app.use('/api', middleware.auth);
getModules().forEach(function (key) {
    app.use(`/api/${key}`, require(`@module/${key}/routes`));
});
app.use('/auth', require('@module/users/auth-routes'));
app.get('/', require('@module/front/routes'));
app.use(require('@module/front/controllers/errors-controller').notFound);
app.use(require('@module/front/controllers/errors-controller').actionBreak);

/////////////////////////////////// server
const port = process.env.APP_PORT;
app.listen(port, () => console.log(`listening on port ${port}!`));
