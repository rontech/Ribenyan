window.workers = {};

Template.imageUploadModal.events({
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
                	
                    setData(file._id);
                    //console.log(ev.currentTarget);

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

Template.imageUploadModal.helpers({
    files: function () {
        return Files.find({}, {
            sort: {createdAt: 1, name: 1}
        });
    }
});

//设置数据
function setData(id){
    
    Session.set("selectImageID",id);
    //关闭 --popup
    Modal.hide("popupViewNewsModal");
}