/*
 * Copyright Bill Pijewski
 */

var cp = require('child_process'),
    fs = require('fs');

module.exports = exports;

exports.get = function (file, attrFile, callback) {
	// runat file cat attrfile

	cp.exec('runat ' + file + ' cat ' + attrFile,
	    function (err, stdout, stderr) {
		if (err)
			return (callback(err));

		var attrs = JSON.parse(stdout);
		return (callback(null, attrs));	
	});
};

exports.put = function (file, attrFile, attrs, callback) {
	// runat file cp /var/tmp/props attrfile

	var props = JSON.stringify(attrs);

	/* Find a temporary place to write the stringify'd object. */
	var tmpfile = '/var/tmp/fsattr.' + process.pid +
	    '.' + parseInt(Math.random() * 1000000000, 10);
		
	fs.writeFile(tmpfile, props, function (err) {
		if (err)
			return (callback(err));

		cp.exec('runat ' + file + ' cp ' + tmpfile + ' ' + attrFile,
		    function (suberr, stdout, stderr) {
			if (suberr)
				return (callback(suberr));

			fs.unlink(tmpfile, function (subsuberr) {
				if (subsuberr)
					return (callback(subsuberr));
				return (callback(null));
			});
		});
	});
};
