node-fsattr - manipulate SunOS extended file attributes
=======================================================

This module allows its callers to create, modify, and delete extended file
attributes on Solaris and Solaris-derived (i.e. illumos) platforms.  Extended
attributes are a namespace of arbitrary files stored with each file, assuming
the underlying filesystem supports extended attributes.  ZFS is the main
filesystem used on these platforms and has support for extended attributes.


API
===

fsattr.get(file, attrFile, function (err, props) {
    // props is a JSON object
});

fsattr.put(file, attrFile, props, function (err) {
     ....
});

fsattr.del(file, attrfile, function (err) {
     ....
});

The extended file attributes interface provides an arbitrary namespace of files,
and each file can contain any data.  To keep things simple and cut down on
complexity, the API will accept a JSON object per attribute file, stringify that
JSON object, and write it into the attribute file.  Likewise, when getting
properties from an attribute file, this module will JSON.parse() the attribute
the file and return that object.  Yes, other formats will work, but it isn't
worth exposing that complexity in this API.


See also
========

fsattr(5)


Status
======

As of April 2012, this module has been tested and verified to work on SmartOS, a
distribution of illumos.

While this module uses the runat(1) command to manipulate extended attributes,
future work could involve a native add-on which uses the openat(2) and related
interfaces.
