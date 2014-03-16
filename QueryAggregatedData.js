var mongoose = require('mongoose');
var fs = require('fs');

require('./AcmeSchemas.js')();

mongoose.connect('mongodb://localhost/acme');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to acme!')
});

var AggregatedData = mongoose.model('AggregatedData');

AggregatedData
.find({
  'value.order' : {
    $gt : 100
  },
  'value.products' : {
    $exists : true
  }, 
  $where : 'this.value.products.length>10'
})
.exec(function(err, data){
  var result = [];
  data.forEach(function(element){
    var resultElement = {};
    resultElement.color = element._id;
    resultElement.tooSmallPercent = element.value.too_small/element.value.order;
    resultElement.tooLargePercent = element.value.too_large/element.value.order;
    resultElement.dontLikePercent = element.value.dont_like/element.value.order;
    result.push(resultElement);
  })
  
  compareByTooSmall = function(a, b) {
    return b.tooSmallPercent - a.tooSmallPercent;
  }

  compareByTooLarge = function(a, b) {
    return b.tooLargePercent - a.tooLargePercent;
  }
  
  compareByDontLike = function(a, b) {
    return b.dontLikePercent - a.dontLikePercent;
  }

  console.log("Top 5 too_small return rates");
  result.sort(compareByTooSmall);
  
 console.log("Color\tTooSmallPercent\tTooLargePercent\tDontLikePercent");
  for (var i=0; i<=5; i++) {
    console.log(result[i].color + '\t' + (result[i].tooSmallPercent*100).toFixed(2) + '%' + '\t' + (result[i].tooLargePercent*100).toFixed(2) + '%' + '\t' + (result[i].dontLikePercent*100).toFixed(2) + '%');
  }
  
  console.log("\nTop 5 too_large return rates");
  result.sort(compareByTooLarge);

  for (var i=0; i<=5; i++) {
    console.log(result[i].color + '\t' + (result[i].tooSmallPercent*100).toFixed(2) + '%' + '\t' + (result[i].tooLargePercent*100).toFixed(2) + '%' + '\t' + (result[i].dontLikePercent*100).toFixed(2) + '%');
  }

  console.log("\nTop 5 dont_like return rates");
  result.sort(compareByDontLike);

  for (var i=0; i<=5; i++) {
    console.log(result[i].color + '\t' + (result[i].tooSmallPercent*100).toFixed(2) + '%' + '\t' + (result[i].tooLargePercent*100).toFixed(2) + '%' + '\t' + (result[i].dontLikePercent*100).toFixed(2) + '%');
  }
});



