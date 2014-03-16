var mongoose = require('mongoose');

module.exports = function(){
  mongoose.model('Product', new mongoose.Schema({ 
    product_id : Number,
    color_id : Number,
    variant_id : Number,
    product_brand : String,
    product_name : String,
    color : String,
    size : Number,  
    price : Number,
    discount : Number,
    division : String,
    department : String,
    class : String,
    subclass : String
  }), 'variants');

  mongoose.model('Transaction', new mongoose.Schema({ 
    user_id : Number,
    transaction_id : Number,
    transaction_type : String,
    transaction_date : Date,
    variant_id : {type : Number, ref : 'Product'},
    max_return_days : Number,
    return_reason : String,
    cancel_type : String,
    quantity : Number
  }), 'transactions');
    
  mongoose.model('JoinedCollection', new mongoose.Schema({ 
    _id : String,
    value : {
      color : String,
	  product_id : String,
      transactions : {
        too_small : Number,
        too_large : Number,
        dont_like : Number,
        order : Number
      }
    }
  }), 'joinedCollection');
  
  mongoose.model('AggregatedData', new mongoose.Schema({ 
    _id : String,
    value : {
      products : Number,
      too_small : Number,
          too_large : Number,
          dont_like : Number,
          order : Number
    }
  }), 'aggregatedData');
}