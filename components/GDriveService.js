"use strict";
var Project_1 = require("../gantt/Model/Project");
var GDriveService = (function () {
    function GDriveService(GAuth, GApi, $q, $window, $http, $mdDialog, $mdToast) {
        this.GAuth = GAuth;
        this.GApi = GApi;
        this.$q = $q;
        this.$window = $window;
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.clientID = "352031715395-bho0ck1ajm6aojgnqv7j8oqiu8rknpta.apps.googleusercontent.com";
        this.scopes = 'https://www.googleapis.com/auth/drive';
    }
    GDriveService.prototype.save = function (project) {
        var _this = this;
        var that = this;
        var id;
        this.init().then(function (idParam) {
            id = idParam;
            return _this.checkIfFileExists(project, id);
        }).then(function (fileId) {
            if (fileId != null) {
                var confirm = _this.$mdDialog.confirm()
                    .title('File already exists')
                    .textContent('The file with this project already exists on google drive, do you want to replace it?')
                    .ariaLabel('File exists, replace?')
                    .ok('Yes')
                    .cancel('No');
                _this.$mdDialog.show(confirm).then(function () {
                    that.deleteFile(fileId).then(function (result) {
                        return that.uploadFile(project, id);
                    }).then(function (result) {
                        that.$mdToast.showSimple("Successfully saved to Google Drive");
                    });
                }, function () {
                    that.$mdToast.showSimple("Project not saved");
                });
            }
            else {
                _this.uploadFile(project, id).then(function (result) { return that.$mdToast.showSimple("Successfully saved to Google Drive"); });
            }
        });
    };
    GDriveService.prototype.list = function () {
        var _this = this;
        return this.init().then(function (id) {
            return _this.listFiles(id);
        });
    };
    GDriveService.prototype.open = function (id) {
        var _this = this;
        return this.init().then(function (folderId) {
            return _this.getProjectFromFile(id);
        });
    };
    GDriveService.prototype.init = function () {
        var _this = this;
        return this.authenticate().then(function () {
            return _this.checkFolder();
        });
    };
    GDriveService.prototype.authenticate = function () {
        var _this = this;
        var result = this.$q.defer();
        this.GApi.load('drive', 'v2');
        this.GAuth.setClient(this.clientID);
        this.GAuth.setScope(this.scopes);
        this.GAuth.checkAuth().then(function (user) {
            result.resolve();
        }, function () {
            _this.GAuth.login(function (user) {
                result.resolve();
            }, function () {
                result.reject();
            });
        });
        return result.promise;
    };
    //title = "Gantt" and mimeType = "application/vnd.google-apps.folder" and "root" in parents and trashed = false
    GDriveService.prototype.checkFolder = function () {
        var _this = this;
        var result = this.$q.defer();
        this.GApi.executeAuth('drive', 'files.list', {
            q: 'title = "Gantt" and mimeType = "application/vnd.google-apps.folder" and "root" in parents and trashed = false'
        }).then(function (files) {
            if (files.result.items.length > 0) {
                result.resolve(files.result.items[0].id);
            }
            else {
                _this.GApi.executeAuth('drive', 'files.insert', {
                    title: 'Gantt',
                    mimeType: 'application/vnd.google-apps.folder'
                }).then(function (resp) {
                    result.resolve(resp.id);
                }, function () {
                    result.reject();
                });
            }
        }, function () {
            result.reject();
        });
        return result.promise;
    };
    GDriveService.prototype.uploadFile = function (project, parentId) {
        var deferred = this.$q.defer();
        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";
        var metadata = {
            'title': project.name,
            'mimeType': 'application/json',
            'parents': [{ 'id': parentId }]
        };
        var multipartRequestBody = delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: application/json\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            btoa(JSON.stringify(JSON.decycle(project))) +
            close_delim;
        var request = this.$window.gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': { 'uploadType': 'multipart' },
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
        });
        request.then(function (file) {
            deferred.resolve(file.result);
        }, function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };
    //"0B7P00KS5T8k2eXltcFNIR2FJdEk" in parents and title = "Test project" and trashed = false
    GDriveService.prototype.checkIfFileExists = function (project, id) {
        var result = this.$q.defer();
        this.GApi.executeAuth('drive', 'files.list', {
            q: '"' + id + '" in parents and title = "' + project.name + '" and trashed = false'
        }).then(function (files) {
            if (files.result.items.length > 0) {
                result.resolve(files.result.items[0].id);
            }
            else {
                result.resolve(null);
            }
        }, function () {
            result.reject();
        });
        return result.promise;
    };
    GDriveService.prototype.listFiles = function (id) {
        var result = this.$q.defer();
        this.GApi.executeAuth('drive', 'files.list', {
            q: '"' + id + '" in parents and trashed = false'
        }).then(function (files) {
            var projectFiles = [];
            files.result.items.forEach(function (item) {
                projectFiles.push({ name: item.title, downloadUrl: item.downloadUrl });
            });
            result.resolve(projectFiles);
        }, function () {
            result.reject();
        });
        return result.promise;
    };
    GDriveService.prototype.deleteFile = function (id) {
        var result = this.$q.defer();
        return this.GApi.executeAuth('drive', 'files.delete', {
            fileId: id
        });
    };
    GDriveService.prototype.getProjectFromFile = function (downloadUrl) {
        var _this = this;
        var result = this.$q.defer();
        var project = new Project_1.Project();
        this.GAuth.getToken().then(function (token) {
            return _this.$http.get(downloadUrl, {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                }
            });
        }).then(function (file) {
            project.deserialize(file.data);
            JSON.retrocycle(project);
            result.resolve(project);
        });
        return result.promise;
    };
    return GDriveService;
}());
exports.GDriveService = GDriveService;
//# sourceMappingURL=GDriveService.js.map