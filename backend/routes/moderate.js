var fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

router.get('/users/', function(req, res, next) {
	var User = mongoose.model('User')
	
	User.find({ moderator: true }, function(err, users) {
		if (err) return console.error(err);
		
		res.json(users)
	})
	
});

router.post('/user', (req, res, next) => {
	
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === process.env.OAUTH_AUD) {
			
			//Validate that user has proper permissions
			var User = mongoose.model('User')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (accessUser.owner || accessUser.admin) {
					
					var reqUser = JSON.parse(req.body.user);
					
					User.findById(reqUser._id, function(err, user) {
						user.moderator = reqUser.moderator;
						user.admin = reqUser.admin;
						
						user.save(function(err, newU) {
							if (err) return console.error(err);
							res.json(newU)
						})
					})
					
				}
				
			})
			
			
		}
	})
});

router.post('/user/permissions', (req, res, next) => {
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === process.env.OAUTH_AUD) {
			
			var User = mongoose.model('User')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				var reqUser = JSON.parse(req.body.user);
				
				if (accessUser.owner || accessUser.admin) {
					
					User.findOne({ email: reqUser.email }, function(err, user) {
						if (err) return console.error(err);
						
						if (user !== null) {
							
							user.moderator = reqUser.moderator;
							user.admin = reqUser.admin;
							
							user.save(function(err, newU) {
								if (err) return console.error(err);
								res.json(newU)
							})
						}
						else {
							console.log("User not found")
							
							var newUser = new User({
								email: reqUser.email,
								name: "",
								moderator: reqUser.moderator,
								admin: reqUser.admin,
								owner: false
							});
							newUser.save(function(err, newU) {
								if (err) return console.error(err);
								res.json(newU)
							});
						}
					})
					
				}
			});
		}
	})
});

router.post('/card', (req, res, next) => {
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === process.env.OAUTH_AUD) {
			var User = mongoose.model('User')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (accessUser.moderator || accessUser.admin || accessUser.owner) {
					var reqCard = JSON.parse(req.body.card);
					
					var Card = mongoose.model('Card')
					
					Card.findById(reqCard._id, function(err, card) {
						if (err) return console.error(err);
						
						card.approved = reqCard.approved;
						card.approvalMessage = reqCard.approvalMessage;
						card.approvalBy = accessUser._id;
						
						card.save(function(err, newC) {
							if (err) return console.error(err);
							res.json(newC);
						})
					})
				}
			});
		}
	})
	
})

router.get('/cards', (req, res, next) => {
	var Card = mongoose.model('Card');
	
	Card.find({ approved: 2 }, function(err, cards) {
		if (err) return console.error(err);
		res.json(cards)
	})
});

router.get('/settings', (req, res, next) => {
	var Settings = mongoose.model('Settings')
	
	Settings.findOne(function(err, settings) {
		if (err) return console.error(err);
		
		res.json(settings)
	})
});

router.post('/changeSettings', (req, res, next) => {
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === process.env.OAUTH_AUD) {
			
			var User = mongoose.model('User')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (accessUser.owner) {
					var reqSettings = JSON.parse(req.body.settings)
		
					var Settings = mongoose.model('Settings')
					
					Settings.findOne(function(err, settings) {
						if (err) return console.error(err);
						
						if (settings !== null) {
							settings.moderatorsOnly = reqSettings.moderatorsOnly;
							settings.domainRestriction = reqSettings.domainRestriction;
							settings.domain = reqSettings.domain;
							
							if (settings.owner !== reqSettings.owner) {
								User.findOne({ email: settings.owner }, function(err, oldOwner) {
									if (err) return console.error(err);
									
									oldOwner.owner = false;
									oldOwner.save(function(err) {
										if (err) return console.error(err);
									})
								});
								User.findOne({ email: reqSettings.owner }, function(err, newOwner) {
									if (err) return console.error(err);
									
									if (newOwner !== null) {
										newOwner.moderator = true;
										newOwner.admin = true;
										newOwner.owner = true;
										
										newOwner.save(function(err) {
											if (err) return console.error(err);
										})
									}
									else {
										var newUser = new User({
											email: reqSettings.owner,
											name: "",
											moderator: true,
											admin: true,
											owner: true
										});
			
										newUser.save(function(err, newU) {
											if (err) return console.error(err);
										});
									}
								})

								settings.owner = reqSettings.owner;
							}
							
							settings.save(function(err, newS) {
								if (err) return console.error(err);
								res.json(newS);
							})
						}
						else {
							var newSettings = new Settings({
								moderatorsOnly: reqSettings.moderatorsOnly,
								domainRestriction: reqSettings.domainRestriction,
								domain: reqSettings.domain,
								owner: reqSettings.owner
							});
						
							newSettings.save(function(err, newS) {
								if (err) return console.error(err);
								res.json(newS);
							})
						}
					})
				}
			});
			
			
		}
	})
	
})

router.post('/deleteBlanks', (req, res, next) => {
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === process.env.OAUTH_AUD) {
			
			var User = mongoose.model('User')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (accessUser.owner) {
					
					var Deck = mongoose.model('Deck')
					var Card = mongoose.model('Card')
					
					Deck.deleteMany({ approved: 3 }, function(err) {
						if (err) return console.error(err);
					});
					Card.deleteMany({ approved: 3 }, function(err) {
						if (err) return console.error(err);
					});
					res.json({});
				}
			});
			
			
		}
	})
	
})

module.exports = router;
