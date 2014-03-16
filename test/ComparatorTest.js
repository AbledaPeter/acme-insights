var expect = require("chai").expect;
var comparator = require("../Comparator.js");

describe("Comparator", function() {
  describe("#compareByAttributeDesc()", function() {
    it("should return negative if the first is bigger", function(){
      var record1 = {
        attrib : 6
      }

      var record2 = {
        attrib : 5
      }
	  
      var result = comparator.compareByAttributeDesc(record1, record2, 'attrib');

      expect(result).to.be.below(0);
    });
    it("should return positive if the second is bigger", function(){
      var record1 = {
        attrib : 5
      }

      var record2 = {
        attrib : 6
      }
       
      var result = comparator.compareByAttributeDesc(record1, record2, 'attrib');
       
      expect(result).to.be.above(0);
    });
	it("should return zero if equals", function(){
      var record1 = {
        attrib : 5
      }

      var record2 = {
        attrib : 5
      }
       
      var result = comparator.compareByAttributeDesc(record1, record2, 'attrib');
       
      expect(result).to.equal(0);
    });
  });
});

