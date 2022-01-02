const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const expressMySQLSession = require('express-mysql-session');
const config = require('./config');
const routes = require('./routes');

require('./lib/passport');

// Intializations
const MySQLStore = expressMySQLSession(session);
const { database, port } = config;
const app = express();

// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  }),
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  }),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(routes);

// Public
app.use(express.static(path.join(__dirname, 'public')));

const PORT = port || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`, 'SERVER');
});

module.exports = app;
