import {Project} from "../gantt/Model/Project";

export class GDriveService {
    token:string;
    clientID = "352031715395-bho0ck1ajm6aojgnqv7j8oqiu8rknpta.apps.googleusercontent.com";
    scopes = 'https://www.googleapis.com/auth/drive';


    constructor(private GAuth:any, private GApi:any, private $q:angular.IQService, private $window:any, private $http:angular.IHttpService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService) {
    }

    save(project:Project):void {
        var that = this;
        var id:string;
        this.init().then((idParam) => {
            id = idParam;
            return this.checkIfFileExists(project, id)
        }).then((fileId) => {
            if (fileId != null) {
                var confirm = this.$mdDialog.confirm()
                    .title('File already exists')
                    .textContent('The file with this project already exists on google drive, do you want to replace it?')
                    .ariaLabel('File exists, replace?')
                    .ok('Yes')
                    .cancel('No');
                this.$mdDialog.show(confirm).then(function () {
                    that.deleteFile(fileId).then((result) => {
                        return that.uploadFile(project, id)
                    }).then((result) => {
                        that.$mdToast.showSimple("Successfully saved to Google Drive")
                    });

                }, function () {
                    that.$mdToast.showSimple("Project not saved");
                });
            } else {
                this.uploadFile(project, id).then((result) => that.$mdToast.showSimple("Successfully saved to Google Drive"));
            }
        });
    }

    list():angular.IPromise<ProjectFile[]> {
        return this.init().then((id) => {
            return this.listFiles(id)
        });
    }

    open(id:string):angular.IPromise<Project> {
        return this.init().then((folderId) => {
            return this.getProjectFromFile(id);
        });
    }

    private init():angular.IPromise<string> {
        return this.authenticate().then(() => {
            return this.checkFolder();
        });
    }

    private authenticate():angular.IPromise<void> {
        var result = this.$q.defer<void>();
        this.GApi.load('drive', 'v2');
        this.GAuth.setClient(this.clientID);
        this.GAuth.setScope(this.scopes);
        this.GAuth.checkAuth().then(
            (user:any) => {
                result.resolve();
            },
            () => {
                this.GAuth.login(
                    (user:any) => {
                        result.resolve();
                    },
                    () => {
                        result.reject()
                    }
                );
            }
        );
        return result.promise;
    }

    //title = "Gantt" and mimeType = "application/vnd.google-apps.folder" and "root" in parents and trashed = false
    private checkFolder():angular.IPromise<string> {
        var result = this.$q.defer<string>();
        this.GApi.executeAuth('drive', 'files.list', {
            q: 'title = "Gantt" and mimeType = "application/vnd.google-apps.folder" and "root" in parents and trashed = false'
        }).then(
            (files:any) => {
                if (files.result.items.length > 0) {
                    result.resolve(files.result.items[0].id);
                } else {
                    this.GApi.executeAuth('drive', 'files.insert', {
                        title: 'Gantt',
                        mimeType: 'application/vnd.google-apps.folder'
                    }).then(
                        (resp:any) => {
                            result.resolve(resp.id);
                        },
                        () => {
                            result.reject();
                        })
                }
            },
            () => {
                result.reject()
            });
        return result.promise;
    }

    private uploadFile(project:Project, parentId:string) {
        var deferred = this.$q.defer<void>();

        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";

        var metadata = {
            'title': project.name,
            'mimeType': 'application/json',
            'parents': [{'id': parentId}]
        };

        var multipartRequestBody =
            delimiter +
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
            'params': {'uploadType': 'multipart'},
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
        });
        request.then(function (file:any) {
            deferred.resolve(file.result);
        }, function (reason:any) {
            deferred.reject(reason);
        });

        return deferred.promise;
    }

    //"0B7P00KS5T8k2eXltcFNIR2FJdEk" in parents and title = "Test project" and trashed = false
    private checkIfFileExists(project:Project, id:string):angular.IPromise<string> {
        var result = this.$q.defer<string>();
        this.GApi.executeAuth('drive', 'files.list', {
            q: '"' + id + '" in parents and title = "' + project.name + '" and trashed = false'
        }).then(
            (files:any) => {
                if (files.result.items.length > 0) {
                    result.resolve(files.result.items[0].id)
                } else {
                    result.resolve(null);
                }
            },
            () => {
                result.reject()
            });
        return result.promise;
    }

    private listFiles(id:string):angular.IPromise<ProjectFile[]> {
        var result = this.$q.defer<ProjectFile[]>();
        this.GApi.executeAuth('drive', 'files.list', {
            q: '"' + id + '" in parents and trashed = false'
        }).then(
            (files:any) => {
                var projectFiles:ProjectFile[] = [];
                files.result.items.forEach((item:any) => {
                    projectFiles.push({name: item.title, downloadUrl: item.downloadUrl})
                });
                result.resolve(projectFiles);
            },
            () => {
                result.reject()
            });
        return result.promise;
    }

    private deleteFile(id:string):angular.IPromise<any> {
        var result = this.$q.defer<ProjectFile[]>();
        return this.GApi.executeAuth('drive', 'files.delete', {
            fileId: id
        });
    }

    private getProjectFromFile(downloadUrl:string):angular.IPromise<Project> {
        var result = this.$q.defer<Project>();
        var project = new Project();
        this.GAuth.getToken().then((token:any) => {
                return this.$http.get(downloadUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + token.access_token
                    }
                })

            }
        ).then((file:any) => {
                project.deserialize(file.data);
                JSON.retrocycle(project);
                result.resolve(project);
            }
        );
        return result.promise;
    }
}

export interface ProjectFile {
    name:string,
    downloadUrl:string
}