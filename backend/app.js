var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var cardRouter = require('./routes/cards');
var deckRouter = require('./routes/decks');
var userRouter = require('./routes/users');
var newRouter = require('./routes/new');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

//Route management
app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/board', indexRouter)
app.use('/card', cardRouter);
app.use('/deck', deckRouter);
app.use('/user', userRouter);
app.use('/new', newRouter);
app.use('/auth', authRouter)

//Handles uploading images for the how cards
app.post('/upload', (req, res, next) => {
	console.log(req.body.id);
	let imageFile = req.files.file;
	
	//Stores the images in a folder structure with each card having its own folder
	fs.mkdir(`public/${req.body.id}`, function(e) {
		if (!e || e.code === 'EEXIST') {
			imageFile.mv(`public/${req.body.id}/${req.body.filename}.jpg`, function(err) {
				if (err) {
					return res.status(500).send(err);
				}
		
				res.json({ file: `public/${req.body.id}/${req.body.filename}.jpg`});
			});
		}
		else {
			console.log(e);
		}
	});
});

app.set('view engine', 'html');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
