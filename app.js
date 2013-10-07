var express = require('express'),
	mongoose = require('mongoose'),
	app_root = __dirname;
	
var app = express();

// model
mongoose.connect('mongodb://localhost/testing');

var Comment = mongoose.model('Comment', new mongoose.Schema({
  text: String,
  done: Boolean,
  order: Number
}));

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(app_root));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.post('/api/comments', function(req, res){
	var comment = new Comment({
		text: req.body.text,
		done: req.body.done,
		order: req.body.order
	});
	
	comment.save(function(err) {
		if (!err) {
			return console.log("created");
		}
	});
	
	return res.send(comment);
});


app.listen(3000);