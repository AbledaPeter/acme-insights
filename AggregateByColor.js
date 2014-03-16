var mongoose = require('mongoose');
require('./AcmeSchemas.js')();

mongoose.connect('mongodb://localhost/acme');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to acme!')
});

var JoinedCollection = mongoose.model('JoinedCollection');

var options = {};

options.map = function() {
  var value = {
    products : [this.value.product_id],
    too_small : this.value.transactions.too_small,
    too_large : this.value.transactions.too_large,
    dont_like : this.value.transactions.dont_like,
    order : this.value.transactions.order
  }

  emit(this.value.color, value);
};

options.reduce = function(key, values){
  var result = {
    products : [],
    too_small : 0,
    too_large : 0,
    dont_like : 0,
    order : 0
  }
  
  var uniqueProducts = {};
  
  values.forEach(function(value){
	uniqueProducts[value.products[0]] = uniqueProducts[value.products[0]]+1 || 1;
    result.too_small += value.too_small;
    result.too_large += value.too_large;
    result.dont_like += value.dont_like;
    result.order += value.order;
  });
 
  for(var key in uniqueProducts) 
    result.products.push(key);
  
  return result;
}

options.out = { replace: 'aggregatedData' };

options.verbose = true;

JoinedCollection.mapReduce(options, function (err, results, stats) {
  console.log('map reduce took %d ms', stats.processtime);
});
