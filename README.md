[![build status](https://secure.travis-ci.org/pijewski/node-fsattr.png)](http://travis-ci.org/pijewski/node-fsattr)
node-fsattr - manipulate SunOS extended file attributes
=======================================================

This module allows its callers to create, modify, and delete extended file
attributes on Solaris and Solaris-derived (i.e. illumos) platforms.

Extended attributes are a namespace of arbitrary files stored with each file,
assuming the underlying filesystem supports extended attributes.  ZFS is the
main filesystem used on these platforms and supports extended attributes.


API
===

    fsattr.put(file, attrFile, props, function (err) {
         ....
    });
    
    fsattr.get(file, attrFile, function (err, props) {
        // props is a JSON object
    });
    
    fsattr.del(file, attrfile, function (err) {
         ....
    });

To keep things simple and cut down on complexity, the API accepts a JSON object
per attribute file, stringify()s that JSON object, and writes it into the
attribute file.  Likewise, when getting properties from an attribute file, this
module will JSON.parse() the attribute the file and return that object.  Yes,
other formats will work, but it isn't worth exposing that complexity in this
API.


See also
========

fsattr(5)


Status
======

As of April 2012, this module has been tested and verified to work on SmartOS, a
distribution of illumos.

This module uses the runat(1) command to manipulate extended attributes; future
work could involve a native add-on which uses the openat(2) and related
interfaces.
