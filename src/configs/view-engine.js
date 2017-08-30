import * as path from "path";

export const viewEngineConfig = {
    defaultView: "jade",
    ejs: {
        viewPath: path.join(__dirname + "/../../", 'views'),
        viewEngine: 'ejs',
        viewResolve: require('ejs').renderFile
    },
    pug: {
        viewPath: path.join(__dirname + "/../../", 'views'),
        viewEngine: 'pug',
        viewResolve: require('pug').__express
    },
    jade: {
        viewPath: path.join(__dirname + "/../../", 'views'),
        viewEngine: 'jade',
        viewResolve: require('jade').__express
    }
};