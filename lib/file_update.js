UploadFS.config.simulateWriteDelay = 500;

FilesStore = new UploadFS.store.Local({
    collection: Files,
    name: 'files',
    path: '/uploads/files',
    
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
								"<td><img src=" + dFile.url + "\" width=\"40\" height=\"60\"></td>" +
								"<td><a href="+ dFile.url + " target=\"_blank\"> " + dFile.name + "</a></td>" +
								"<td>"+ dFile.type + "</td>" +
								"<td>"+ dFile.extension + "</td>" +
								"<td>"+ formatSize(dFile.size) + "</td>" +
								"<td> <button name=\"delete\" type=\"button\" value=\"" + dFile._id + "\">Delete</button></td>" +
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

    Template.uploadForm.events({
        'click [name=upload]': function (ev, tpl) {
            ev.preventDefault();
            
            var callback = function (ev) {
                UploadFS.readAsArrayBuffer(ev, function (data, file) {
                    var uploader = new UploadFS.Uploader({
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
