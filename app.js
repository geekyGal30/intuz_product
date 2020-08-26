const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const connection = require('express-myconnection');
const mysql = require('mysql');

//load products route
let products = require('./routes/products');
let app = express();

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'products'
  }, 'pool')
);

app.get('/', routes.index);
app.get('/products', products.list);
app.get('/products/add', products.add);
app.post('/products/add', products.save);
app.get('/products/delete/:id', products.delete_product);
app.get('/products/edit/:id', products.edit);
app.post('/products/edit/:id', products.save_edit);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
