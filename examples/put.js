var fs = require('fs'),
    fsattr = require('../lib/fsattr');

fs.open('sample', 'w', function (err, fd) {
	fsattr.put('sample', 'fooprops', {foo: 'bar'}, function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Wrote extended attributes successfuly');
	});
});
