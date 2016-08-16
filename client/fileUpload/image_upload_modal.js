window.workers = {};

Template.imageUploadModal.events({
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
                };
                uploader.onProgress = function (file, progress) {
                    // console.log(file.name + ' :'
                    //     + "\n" + (progress * 100).toFixed(2) + '%'
                    //     + "\n" + (this.getSpeed() / 1024).toFixed(2) + 'KB/s'
                    //     + "\n" + 'elapsed: ' + (this.getElapsedTime() / 1000).toFixed(2) + 's'
                    //     + "\n" + 'remaining: ' + (this.getRemainingTime() / 1000).toFixed(2) + 's'
                    // );
                };

                uploader.start();
            });
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