var fsattr = require('../lib/fsattr');

fsattr.get('sample', 'fooprops', function (err, props) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Here are the extended attributes: ');
	console.log(props);
});
