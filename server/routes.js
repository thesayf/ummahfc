module.exports = function(app, models, utils, cont, info) {

    // This registers the User
	app.post("/api/register", function(req, res){
        cont.member.register(models.User, req, {username: req.body.username}, cont, function(resp) {
			console.log(resp);
            if(resp.status == false) {
				cont.func.sendInfo(res, resp.status, {errMessage: resp.msg});
			} else {
				cont.pp.issueToken(resp.user, function(err, token) {
	                res.cookie('remember_me', token, { maxAge: 604800000 });
	                if(err) { return next(err);}
					cont.func.sendInfo(res, true, {message: 'Re successful.', data: token});
	            });
			}
        })
	});

    // This logs user in
    app.post('/api/login', function(req, res, next) {
        utils.passport.authenticate('local', function(err, user, info) {
            if(user === false) {
                cont.func.sendInfo(res, user, {errMessage: 'Unable to login.'});
            } else {
                cont.pp.issueToken(user, function(err, token) {
                    cont.func.sendInfo(res, true, {message: 'Login successful.', data: token});
                });
            }
        })(req, res, next);
    });

    // This logs user out
    app.post("/api/logout", function(req, res){
        req.logOut();
        res.cookie('connect.sid', '', { expires: new Date(1), path: '/' });
        res.cookie('remember_me', '', { expires: new Date(1), path: '/' });
		res.json(req.user);
	});

    // This authenitcates users token
    app.post('/api/check-token', function(req, res) {
        cont.pp.checkAuthDetails(req.body.data, function(userID){
            if(userID) {
                cont.func.sendInfo(res, true, {message: 'Verified', data: userID});
            }
        })
    })

    // this sets up passport
    utils.passport.use('local', new utils.localStrategy(function(username, password, done){
	    models.User.findOne({username: username, password: password}, function(err, user){
	        if(user){return done(null, user);}
            return done(null, false, {message: 'Unable to login'});
	    });
	}));

	utils.passport.serializeUser(function(user, done) {
        done(null, user);
    });
    utils.passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // This gets all user booking info
    app.post("/api/grab-bookings", function(req, res){
        if(req.body.token) {
            cont.pp.getUserIDFromToken(req.body.token, function(userID){
                //var tempdb = db.getCollection. req.body.colName;
                models.Quote.find({userID: userID}, function(err, records){
                    if(err) {
                        cont.func.sendInfo(res, false, {errMessage: 'There was error, try again later.'});
                    }
                    cont.func.sendInfo(res, true, {data: records, errMessage: 'There was error, try again later.'});
                })
            });
        } else {
            // no cookie
            res.send(false);
        }
	});

	// BOOK A JOB GET SWIFT
	app.post("/api/book-job", function(req, res){
        if(req.body.token) {
            cont.pp.getUserIDFromToken(req.body.token, function(userID){
                //var tempdb = db.getCollection. req.body.colName;
                models.Quote.find({userID: userID}, function(err, records){
                    if(err) {
                        cont.func.sendInfo(res, false, {errMessage: 'There was error, try again later.'});
                    }
                    cont.func.sendInfo(res, true, {data: records, errMessage: 'There was error, try again later.'});
                })
            });
        } else {
            // no cookie
            res.send(false);
        }
	});

    // This shows the main angular index
    app.get('*', function(req, res) {
        res.render('pages/index');
    });



} // END EXPORT
