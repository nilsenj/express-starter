import {viewEngineConfig} from "./configs/view-engine";
import {_} from "./configs/constants";
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let index = require('./routes/index');
let users = require('./routes/users');
let app = express();

export class App {
    /**
     * Run configuration methods on the app instance.
     */
    constructor() {
        this.app = app;
        this.basicSetup();
        this.middleware();
        this.interceptors();
        this.setUpModels();
        this.routes();
        this.errorHandlers();
        this.setViewEngine();
    }

    /**
     * setup basic libraries
     */
    basicSetup() {
        this.app._ = _;
    }

    /**
     * Configure app middleware.
     */
    middleware() {
        this.app.use(logger("dev"));
        this.app.use(function (req, res, next) {
            res.removeHeader("X-Powered-By");
            res.setHeader('X-Powered-By', 'Nilsenj Starter');
            next();
        });
        // this.app.use(useragent.express());
        this.app.use(bodyParser.json()); // parsing pages
        // this.app.use(methodOverride()); // support for put and delete
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser()); // cookie management
        this.app.use(favicon(__dirname + '/public/corvel.png')); // giving favicon
        this.app.use(sassMiddleware({
            /* Options */
            src: path.join(__dirname, 'public/stylesheets/scss'),
            dest: path.join(__dirname, 'public/stylesheets'),
            debug: true,
            indentedSyntax: false,
            outputStyle: 'compressed',
            prefix: '/public/stylesheets'
        }));
        this.app.use('/public', express.static(path.join(__dirname, 'public')))
    }

    interceptors() {
    }

    errorHandlers() {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            let err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }

    setViewEngine() {
        // view engine setup
        this.app.set('views', viewEngineConfig[viewEngineConfig.defaultView].viewPath);
        this.app.set('view engine', viewEngineConfig[viewEngineConfig.defaultView].viewEngine);
    }

    /**
     * set up models and orm
     * functionality
     */
    setUpModels() {
    }

    /**
     * Configure API endpoints.
     */
    routes() {
        this.app.use('/', index);
        this.app.use('/users', users);
    }

    /**
     *
     * @param orm
     */
    setDb(orm) {
        this.app.orm = orm;
    }

    /**
     *
     * @param key
     * @param value
     */
    set(key, value) {
        this.app.set(key, value);
    }
}

module.exports = new App();