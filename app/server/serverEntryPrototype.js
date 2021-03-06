    'use strict';
    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    //var bodyParser = require('body-parser');
    var configFile = require('../config.json');
    var proxy = require('proxy-middleware');
    var url = require('url');
    //var morgan = require('morgan');
    var favicon = require('serve-favicon');

    var isProduction = process.env.NODE_ENV === 'production';
    //var publicPath = path.join(__dirname, '..','..', 'assets');

    // -------- my proxy----------------------
    var app = express();
    // proxy the request for static assets

    // now requests to '/assets' are proxied to 'http://localhost:8081/assets'
    app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));


    app.use(favicon(path.join('assets', 'favicon.ico')));



    app.use(function logErrors(err, req, res, next) {
            console.error(err.stack);
            next(err);
        }
    );

    //css folder
    app.use('/styles', express.static(path.join('app', 'styles')));

    //app.set('styles', express.static(path.join('app', 'styles')));
    //app.engine('.ejs', require('ejs').__express);
    //app.set('views', 'bin');
    app.set('views', path.join('app', 'server', 'views'));
    app.set('view engine', 'ejs');

    var PORT = (isProduction ? process.env.PORT: configFile.DEV_PORT);
    app.set('port', process.env.PORT || configFile.DEV_PORT);



    //app.use(morgan('dev'));
    //app.use(bodyParser.json());
    app.use(require('marty-express')({
        routes: require('../routes'),
        application: require('../application'),
        rendered: function (result) {
            console.log('Rendered ' + result.req.url);
        }
    }));


    //console.log('Required ejs file: ' + require('./views/index.ejs'));
    //app.get('/', function(req, res) {
    //    //res.sendFile(__dirname + '/index.html');
    //      res.render('index', {body: 'YO bro', state:'ok'});
    //});


    var server = app.listen(app.get('port'), function() {
        console.info('Express server started at http://localhost:' + app.get('port'));
    });



    //var webpack = require('webpack');
    //var WebpackDevServer = require('webpack-dev-server');
    //var webpackConfig = require('../../webpack.browser.config');
    //if(!isProduction){
    //    //----- my-webpack-dev-server------------------
    //    var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
    //        hot: true,
    //        inline: false,
    //        quiet: true,
    //        noInfo: false,
    //        headers: { 'Access-Control-Allow-Origin': '*' },
    //        publicPath: '/assets/',
    //        historyApiFallback: false,
    //
    //        stats: { colors: true }
    //    });
    //
    //    //run webpack hot reload server
    //    webpackServer.listen(8081, 'localhost', function (err) {
    //        if(err) {
    //            return console.log(err);
    //        }
    //        console.log('Webpack server also running, but on port 8081');
    //
    //    });
    //}



    //AS SEEN here: http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router



