var fs = require('fs'),
    fsattr = require('../lib/fsattr');

var file = 'sample';

fs.open(file, 'w', function (err, fd) {
	fsattr.del(file, 'fooprops', function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Deleted extended attributes from \'' +
		    file + '\' successfuly');
	});
});
