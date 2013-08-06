// connect to database
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mongo-nodejs-express';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function callback(){});

var mongooseTypes = require('mongoose-types');
mongooseTypes.loadTypes(mongoose);

var Url = mongoose.SchemaTypes.Url;

var exampleSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  list: [String],
  image: { type: Url },
  video: Url,
  quantity: Number,
  size: { type: Number, min: 1, max: 5 },
  createDate: { type: Date, default: Date.now }
});

var Example = mongoose.model('Example', exampleSchema);

exports.home = function(req, res){
  res.render('examples/new', { title: 'new example' });
};

exports.examples = function(req, res){
  Example.find({}, function(err, examples){
    if (err){
      console.log(err);
    } else {
      res.send(examples);
    }
  });
};

exports.get_example = function(req, res){
  Example.findById(req.params.id, function(err, example){
    if (err){
      console.log(err);
    } else {
      res.send(example);
    }
  });
};

exports.create_example = function(req, res){
  var example = new Example({
    name: req.body.name,
    list: req.body.list,
    image: req.body.image,
    video: req.body.video,
    quantity: req.body.quantity,
    size: req.body.size,
    createDate: req.body.createDate
  });
  example.save(function(err){
    if (err){
      console.log(err);
    } else {
      console.log('example created');
    }
  });
  res.send(example);
};

exports.update_example = function(req, res){
  Example.findById(req.params.id, function(err, example){
    example.name = req.body.name || example.name;
    example.list = req.body.list || example.list;
    example.image = req.body.image || example.image;
    example.video = req.body.video || example.video;
    example.quantity = req.body.quantity || example.quantity;
    example.size = req.body.size || example.size;

    example.save(function(err){
      if (err){
        console.log(err);
      } else {
        console.log('example updated');
      }
    });
    res.send(example);
  });
};

exports.delete_example = function(req, res){
  Example.findById(req.params.id, function(err, example){
    example.remove(function(err){
      if (err){
        console.log(err);
      } else {
        console.log('example deleted');
      }
    });
    res.send('');
  });
};

