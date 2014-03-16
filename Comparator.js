exports = module.exports = {};

exports.compareByAttributeDesc = function(element1, element2, attribute) {
	return element2[attribute] - element1[attribute];
};

