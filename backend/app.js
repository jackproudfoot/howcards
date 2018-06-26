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
var saveRouter = require('./routes/save')
var newRouter = require('./routes/new');
var authRouter = require('./routes/auth');
var moderateRouter = require('./routes/moderate')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'build')));


//Route management
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api/', indexRouter);
app.use('/api/board', indexRouter)
app.use('/api/card', cardRouter);
app.use('/api/deck', deckRouter);
app.use('/api/user', userRouter);
app.use('/api/new', newRouter);
app.use('/api/save', saveRouter)
app.use('/api/auth', authRouter)
app.use('/api/moderate', moderateRouter)

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/howcards');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	var cardSchema = mongoose.Schema({
		owner: mongoose.Schema.Types.ObjectId,
		title: String,
		description: String,
		images: Number,
		steps: Array,
		approved: Number,
		approvalMessage: String,
		approvalBy: mongoose.Schema.Types.ObjectId
	});
	const Card = mongoose.model('Card', cardSchema);
	
	var userSchema = mongoose.Schema({
		email: String,
		name: String,
		moderator: Boolean,
		admin: Boolean,
		owner: Boolean
	});
	const User = mongoose.model('User', userSchema);
	
	var deckSchema = mongoose.Schema({
		title: String,
		description: String,
		owner: mongoose.Schema.Types.ObjectId,
		cards: Array,
		approved: Number
	})
	const Deck = mongoose.model('Deck', deckSchema);
	
	var settingsSchema = mongoose.Schema({
		moderatorsOnly: Boolean,
		domainRestriction: Boolean,
		domain: String,
		owner: String
	});
	const Settings = mongoose.model('Settings', settingsSchema);
})

//Handles uploading images for the how cards
app.post('/upload', (req, res, next) => {
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
