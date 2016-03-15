/**
 * The collection that contains file meta-data (name, size, url...)
 * @type {Mongo.Collection}
 */
Files = new Mongo.Collection('files');

Files.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

/**
 * The thumbnails collection
 * @type {Mongo.Collection}
 */
Thumbs64 = new Mongo.Collection('thumbs64');

Thumbs64.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

/**
 * The thumbnails collection
 * @type {Mongo.Collection}
 */
Thumbs48 = new Mongo.Collection('thumbs48');

Thumbs48.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

/**
 * The thumbnails collection
 * @type {Mongo.Collection}
 */
Thumbs24 = new Mongo.Collection('thumbs24');

Thumbs24.allow({
    insert: function () {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});