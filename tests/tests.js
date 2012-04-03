/*
 * Copyright (c) 2012, Joyent, Inc. All rights reserved.
 */

var test = require('tap').test;

var fs = require('fs'),
    fsattr = require('../lib/fsattr');

var props = {
    str: 'I am a string',
    num: 21,
    arr: [ 'item0', 1, 'item2', { item: 3 } ],
    obj: {  key: 'value' }
};

var TEST_FILE = './foo';

test('setup', function (t) {
	fs.open(TEST_FILE, 'w', function (err, fd) {
		if (err)
			t.ok(false, err.message);
		t.end();
	});
});

test('put extended attributes', function (t) {
	fsattr.put(TEST_FILE, 'props', props, function (err) {
		if (err)
			t.ok(false, err.message);
		t.end();
	});
});

test('get extended attributes', function (t) {
	fsattr.get(TEST_FILE, 'props', function (err, readprops) {
		if (err)
			t.ok(false, err.message);

		t.equal(props.str, readprops.str);
		t.equal(props.num, readprops.num);
		t.equal(props.arr.length, readprops.arr.length);
		for (var ii = 0; ii < props.arr.length; ii++)
			t.similar(props.arr[ii], readprops.arr[ii]);
		Object.keys(props.obj).forEach(function (key) {
			t.equal(props.obj.key, readprops.obj.key);
		});
		t.end();
	});
});

test('delete extended attributes', function (t) {
	fsattr.del(TEST_FILE, 'props', function (err) {
		if (err) {
			t.ok(false, err.message);
			t.end();
			return;
		}

		fsattr.get(TEST_FILE, 'props', function (suberr) {
			console.log('GET RETURN');
			console.log(suberr);
			if (!suberr) {
				t.ok(false, 'fsattr.del() failed ' +
				    'to remove attributes');
				t.end();
				return;
			}

			t.equal(suberr.code, 1);
			t.end();
		});
	});
});

test('teardown', function (t) {
	fs.unlink(TEST_FILE, function (err) {
		t.end();
	});
});
