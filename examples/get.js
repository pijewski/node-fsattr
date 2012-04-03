var fsattr = require('../lib/fsattr');

var file = 'sample';

fsattr.get(file, 'fooprops', function (err, props) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Here are the extended attributes for \'' + file + '\': ');
	console.log(props);
});
