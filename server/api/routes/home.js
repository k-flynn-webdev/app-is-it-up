

module.exports = function( app ){


	app.get('/', function (req,res) {
		// return res.json({ home : true });
		res.send('Home');
	});

	return app;

};