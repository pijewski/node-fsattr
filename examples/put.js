var fs = require('fs'),
    fsattr = require('../lib/fsattr');

var file = 'sample';

fs.open(file, 'w', function (err, fd) {
	fsattr.put(file, 'fooprops', {foo: 'bar'}, function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Wrote extended attributes for \'' + file +
		    '\' successfuly');
	});
});
