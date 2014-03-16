var mongoose = require('mongoose');
require('./AcmeSchemas.js')();

mongoose.connect('mongodb://localhost/acme');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to acme!')
});

var Transaction = mongoose.model('Transaction');
var Product = mongoose.model('Product');

var tOptions = {};
var pOptions = {};

tOptions.map = function() {
  var value = {
    color : '',
	product_id : '',
    transactions : {
      too_small : 0,
      too_large : 0,
      dont_like : 0,
      order : 0
    }
  };
	
  if(this.transaction_type === 'Return'){
    if(this.return_reason === 'too_small'){
      value.transactions.too_small = this.quantity;
    }else if(this.return_reason === 'too_large'){
      value.transactions.too_large = this.quantity;
    }else if(this.return_reason === 'dont_like'){
      value.transactions.dont_like = this.quantity;
    }
  }else if(this.transaction_type === 'Order'){
    value.transactions.order = this.quantity;
  }
  
  emit(this.variant_id, value);
};

pOptions.map = function() {
  var value = {
    color : this.color,
	product_id : this.product_id,
    transactions : {
      too_small : 0,
      too_large : 0,
      dont_like : 0,
      order : 0
    }
  }
    emit(this.variant_id, value);
};

var reduce = function(key, values){  
  var result = {
    color : '',
	product_id : '',
    transactions : {
      too_small : 0,
      too_large : 0,
      dont_like : 0,
      order : 0
    }
  };
  
  values.forEach(function(value){
    if (value.color !== ''){
      result.color = value.color;
    }
	if (value.product_id !== ''){
      result.product_id = value.product_id;
    }
    result.transactions.too_small += value.transactions.too_small;
    result.transactions.too_large += value.transactions.too_large;
    result.transactions.dont_like += value.transactions.dont_like;
    result.transactions.order += value.transactions.order;
  });
 
  return result;
}

tOptions.reduce = reduce;
pOptions.reduce = reduce;

tOptions.out = { 
  reduce: 'joinedCollection' 
}

pOptions.out = { 
  reduce: 'joinedCollection' 
}

tOptions.verbose = true;
pOptions.verbose = true;

Product.mapReduce(pOptions, function (err, results, stats) {
  console.log('map reduce took %d ms', stats.processtime)
});

Transaction.mapReduce(tOptions, function (err, results, stats) {
  console.log('map reduce took %d ms', stats.processtime)
});