// Slow down the transfer to simulate slow connection
UploadFS.config.simulateWriteDelay = 500;


/**
 * The Store that contains files
 * @type {UploadFS.store.Local}
 */
FilesStore = new UploadFS.store.Local({
    collection: Files,
    name: 'files',
    path: '/uploads/files',
    copyTo: [
        new UploadFS.store.Local({
            collection: Thumbs64,
            name: 'thumbs64',
            path: '/uploads/thumbs_64',
            filter: new UploadFS.Filter({
                minSize: 1,
                maxSize: 2048 * 1000, // 2MB
                extensions: ['gif', 'jpg', 'png']
            }),
            transformWrite: function (from, to, fileId, file) {
                // Resize images
                if (file.type.indexOf('image/') === 0) {
                    var gm = Npm.require('gm');
                    if (gm) {
                        gm(from)
                            .resize(64, 64)
                            .gravity('Center')
                            .extent(64, 64)
                            .quality(75)
                            .stream().pipe(to);
                    } else {
                        from.pipe(to);
                    }
                } else {
                    from.pipe(to);
                }
            },
            copyTo: [
                new UploadFS.store.Local({
                    collection: Thumbs24,
                    name: 'thumbs24',
                    path: '/uploads/thumbs_24',
                    filter: new UploadFS.Filter({
                        minSize: 1,
                        maxSize: 2048 * 1000, // 2MB
                        extensions: ['gif', 'jpg', 'png']
                    }),
                    transformWrite: function (from, to, fileId, file) {
                        // Resize images
                        if (file.type.indexOf('image/') === 0) {
                            var gm = Npm.require('gm');
                            if (gm) {
                                gm(from)
                                    .resize(24, 24)
                                    .gravity('Center')
                                    .extent(24, 24)
                                    .quality(75)
                                    .stream().pipe(to);
                            } else {
                                from.pipe(to);
                            }
                        } else {
                            from.pipe(to);
                        }
                    }
                })
            ]
        }),
        new UploadFS.store.Local({
            collection: Thumbs48,
            name: 'thumbs48',
            path: '/uploads/thumbs_48',
            filter: new UploadFS.Filter({
                        minSize: 1,
                        maxSize: 2048 * 1000, // 2MB
                        extensions: ['gif', 'jpg', 'png']
                    }),
            transformWrite: function (from, to, fileId, file) {
                // Resize images
                if (file.type.indexOf('image/') === 0) {
                    var gm = Npm.require('gm');
                    if (gm) {
                        gm(from)
                            .resize(48, 48)
                            .gravity('Center')
                            .extent(48, 48)
                            .quality(75)
                            .stream().pipe(to);
                    } else {
                        from.pipe(to);
                    }
                } else {
                    from.pipe(to);
                }
            }
        })
    ]
});


function formatSize (bytes) {
    if (bytes >= 1000000000) {
        return Math.round(bytes / 1000000000) + ' GB';
    }
    if (bytes >= 1000000) {
        return Math.round(bytes / 1000000) + ' MB';
    }
    if (bytes >= 1000) {
        return Math.round(bytes / 1000) + ' KB';
    }
    return bytes + ' B';
}

		
addRow =function (fileId) {
    var dFile = Files.findOne({_id:fileId});
	$("#filelist").append("<tr id=\""+ dFile._id + "\">" +
								"<td><img src=" + dFile.url + "\" width=\"50\" height=\"70\"></td>" +
								"<td class='text-nowrap'><a href="+ dFile.url + " target=\"_blank\"> " + dFile.name + "</a></td>" +
                                "<td>"+ dFile.url + "</td>" +
								"<td class='text-nowrap'>"+ dFile.type + "</td>" +
								"<td class='text-nowrap'>"+ dFile.extension + "</td>" +
								"<td class='text-nowrap'>"+ formatSize(dFile.size) + "</td>" +
								"<td> <button name=\"delete\" type=\"button\" value=\"" + dFile._id + "\">Delete</button>"+
                                //"<button name=\"url\" type=\"button\" onClick='alert(\""+ dFile.url + "\")''>copyurl</button>+
                                "</td>" +
							"</tr>");

}

// addRow =function (fileId) {
//     var dFile = Files.findOne({_id:fileId});
//     $("#filelist").append("<tr id=\""+ dFile._id + "\">" +
//                                 "<td><div class='col-xs-1><img src=" + dFile.url + "\" width=\"50\" height=\"70\"></div></td>" +
//                                 "<td class='text-nowrap'><div class='col-xs-2><a href="+ dFile.url + " target=\"_blank\"> " + dFile.name + "</a></div></td>" +
//                                 "<td><div class='col-xs-5>"+ dFile.url + "</div></td>" +
//                                 "<td class='text-nowrap'><div class='col-xs-1>"+ dFile.type + "</div></td>" +
//                                 "<td class='text-nowrap'><div class='col-xs-1>"+ dFile.extension + "</div></td>" +
//                                 "<td class='text-nowrap'><div class='col-xs-1>"+ formatSize(dFile.size) + "</div></td>" +
//                                 "<td><div class='col-xs-1> <button name=\"delete\" type=\"button\" value=\"" + dFile._id + "\">Delete</button></div></td>" +
//                             "</tr>");
//}
getFileIds = function(){
	var imageObj = new Array();
	var trList = $("#t_file_upload").find("tr");
        
	for (var i=1;i<trList.length;i++) {
		imageObj[i-1] = trList[i].id;
	}
	
	return imageObj;
	
}


if (Meteor.isClient) {

    window.workers = {};

    Template.uploadForm.events({
        'click [name=upload]': function (ev, tpl) {
            ev.preventDefault();
            
            var callback = function (ev) {
                UploadFS.readAsArrayBuffer(ev, function (data, file) {
                    var uploader = new UploadFS.Uploader({
                    	// Optimize speed transfer by increasing/decreasing chunk size automatically
		                adaptive: true,
		                // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
		                // (used only if adaptive = true)
		                capacity: 0.8, // 80%
		                // The size of each chunk sent to the server
		                chunkSize: 8 * 1024, // 8k
		                // The max chunk size (used only if adaptive = true)
		                maxChunkSize: 128 * 1024, // 128k
		                // This tells how many tries to do if an error occurs during upload
		                maxTries: 5,
                        data: data,
                        file: file,
                        store: FilesStore
                    });

                    // Remove uploader on complete
                    uploader.onComplete = function () {
                    	
						addRow(file._id);

                        delete workers[file.name];
                    };
                    // Remember uploader
                    tpl.autorun(function () {
                        uploader.getProgress();
                        if (uploader.getFile()._id) {
                            workers[uploader.getFile()._id] = uploader;
                        }
                    });
                    uploader.start();
                });
            };

            var input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = callback;
            input.click();
        }
    });

    Template.uploadForm.helpers({
        files: function () {
            return Files.find({}, {
                sort: {createdAt: 1, name: 1}
            });
        }
    });

    Template.file.events({
        'click [name=delete]': function (ev) {
            ev.preventDefault();
            var id = ev.currentTarget.value;

            $("#" + id).remove();
            Files.remove(id);
        }
    });

    
}
