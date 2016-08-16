// Slow down the transfer to simulate slow connection
UploadFS.config.simulateWriteDelay = 500;

//图片存储根目录
fileRootPath = "/opt/meteorNews";

/**
 * The Store that contains files
 * @type {UploadFS.store.Local}
 */
FilesStore = new UploadFS.store.Local({
    collection: Files,
    name: 'files',
    path: fileRootPath + '/uploads/files',
    copyTo: [
        new UploadFS.store.Local({
            collection: Thumbs64,
            name: 'thumbs64',
            path: fileRootPath + '/uploads/thumbs_64',
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
                    path: fileRootPath + '/uploads/thumbs_24',
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
            path: fileRootPath + '/uploads/thumbs_48',
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
								"<td><img src=" + dFile.url + "\" width=\"50\" height=\"50\"></td>" +
								// "<td class='text-nowrap'><a href="+ dFile.url + " target=\"_blank\"> " + dFile.name + "</a></td>" +
        //                         "<td>"+ dFile.url + "</td>" +
								// "<td class='text-nowrap'>"+ dFile.type + "</td>" +
								// "<td class='text-nowrap'>"+ dFile.extension + "</td>" +
								// "<td class='text-nowrap'>"+ formatSize(dFile.size) + "</td>" +
								"<td> <button name=\"delete\" class=\"btn btn-danger\" type=\"button\" value=\"" + dFile._id + "\">删除</button>"+
                                //"<button name=\"url\" type=\"button\" onClick='alert(\""+ dFile.url + "\")''>copyurl</button>+
                                "</td>" +
							"</tr>");

}

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

    /**
     * Opens a dialog to select multiple files
     * @param callback
     */
    UploadFS.selectFilesMobile = (callback) => {
        // let img = document.getElementById("upload_hide");
        this.img = document.createElement('input');
        this.img.type = 'file';
        this.img.multiple = true;
        this.img.onchange = (ev) => {
            let files = ev.target.files;

            for (let i = 0; i < files.length; i += 1) {
                callback.call(UploadFS, files[i]);
                // alert(files.name);
            }
        };
        this.img.click();
    };

    Template.uploadForm.events({
        'click [name=upload]': function (ev, tpl) {
            ev.preventDefault();

            UploadFS.selectFilesMobile(function (file) {   
                const ONE_MB = 1024 * 100;
                let uploader = new UploadFS.Uploader({
                    adaptive: true,
                    chunkSize: ONE_MB * 16.66,
                    maxChunkSize: ONE_MB * 20,
                    data: file,
                    file: file,
                    store: FilesStore,
                    maxTries: 5
                });
                uploader.onAbort = function (file) {
                    // console.log(file.name + ' upload aborted');
                };
                uploader.onComplete = function (file) {
                    // console.log(file.name + ' upload completed');
                    addRow(file._id);
                    NProgress.done();
                };
                uploader.onCreate = function (file) {
                    // console.log(file.name + ' created');
                    workers[file._id] = this;
                    NProgress.start();
                };
                uploader.onError = function (err, file) {
                    // console.error(file.name + ' could not be uploaded', err);
                    NProgress.done();
                };
                uploader.onProgress = function (file, progress) {
                    console.log(file.name + ' :'
                        + "\n" + (progress * 100).toFixed(2) + '%'
                        + "\n" + (this.getSpeed() / 1024).toFixed(2) + 'KB/s'
                        + "\n" + 'elapsed: ' + (this.getElapsedTime() / 1000).toFixed(2) + 's'
                        + "\n" + 'remaining: ' + (this.getRemainingTime() / 1000).toFixed(2) + 's'
                    );
                };
                uploader.start();
            });
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


    /////////////////////////////////////////////////

    Template.uploadFormFront.events({
        'click [name=upload]': function (ev, tpl) {
            ev.preventDefault();
            UploadFS.selectFilesMobile(function (file) {   
                const ONE_MB = 1024 * 100;
                let uploader = new UploadFS.Uploader({
                    adaptive: true,
                    chunkSize: ONE_MB * 16.66,
                    maxChunkSize: ONE_MB * 20,
                    data: file,
                    file: file,
                    store: FilesStore,
                    maxTries: 5
                });
                uploader.onAbort = function (file) {
                    // console.log(file.name + ' upload aborted');
                };
                uploader.onComplete = function (file) {
                    // console.log(file.name + ' upload completed');
                    addRow(file._id);
                    NProgress.done();
                };
                uploader.onCreate = function (file) {
                    // console.log(file.name + ' created');
                    workers[file._id] = this;
                    NProgress.start();
                };
                uploader.onError = function (err, file) {
                    // console.error(file.name + ' could not be uploaded', err);
                    NProgress.done();
                };
                uploader.onProgress = function (file, progress) {
                    console.log(file.name + ' :'
                        + "\n" + (progress * 100).toFixed(2) + '%'
                        + "\n" + (this.getSpeed() / 1024).toFixed(2) + 'KB/s'
                        + "\n" + 'elapsed: ' + (this.getElapsedTime() / 1000).toFixed(2) + 's'
                        + "\n" + 'remaining: ' + (this.getRemainingTime() / 1000).toFixed(2) + 's'
                    );
                };
                uploader.start();
            });  
        }
    });

    Template.uploadFormFront.helpers({
        files: function () {
            return Files.find({}, {
                sort: {createdAt: 1, name: 1}
            });
        }
    });

    Template.fileFront.events({
        'click [name=delete]': function (ev) {
            ev.preventDefault();
            var id = ev.currentTarget.value;

            $("#" + id).remove();
            Files.remove(id);
        }
    });

    
}
