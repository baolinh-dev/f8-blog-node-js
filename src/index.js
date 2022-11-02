const { engine } = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes');
// Connect to DB
const db = require('./config/db');
db.connect();
// Fix body POST method
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
// DomainName/StaticFile -- public/StaticFile
app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger resquest
app.use(morgan('combined'));
// HandleBars
app.engine('handlebars', engine());
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // resources/views
// Route Init
route(app);
// Nhận vào cổng PORT và chạy app
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
