'use strict';

angular.module('winwinsApp')
.controller('group-edit', function($scope, $state, $auth, $timeout,  Upload, Group, Interest) {
    $scope.group = new Group({});

    $scope.doValidate = function() {
        $scope.group.gallery_image = $scope.image_gallery_selected;
        return true;
    };

    $scope.first_stage = true;
    $scope.second_stage = false;

    $scope.doFirstStage = function() {
        $scope.first_stage = false;
        $scope.second_stage = true;
    };

    $scope.doSave = function() {
        if($scope.doValidate()) {
            $scope.group.$save(function(data) {
                $scope.first_stage = false;
                $scope.second_stage = false;
                $state.go('group-promote', {
                    groupId: $scope.group.id
                }); 

            });
        }
    };

    $scope.uploading = false;

    $scope.uploadFiles = function(file) {
        console.log('uploading');
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/api/winwins/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;
                console.log('succeess');

                $timeout(function () {
                    file.result = response.data;
                    $scope.group.photo = response.data.filename;
                    $scope.group.prephoto = response.data.filename;
                    console.log($scope.group.photo);
                });
            }, function (response) {
                console.log(response);
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };


    $scope.gallery_picker = false;

    $scope.select_gallery = function() {
        $scope.gallery_picker = true;
        if(!$scope.image_gallery_selected) {
            $('#image-gallery').imagepicker({
                changed: function(old, new_value) {
                    $scope.$apply(function(){
                        $scope.gallery_picker = false;
                        console.log(new_value);
                        $scope.group.prephoto = new_value[0];
                    });
                }
            });
        }
    };


})
.controller('group-promote', function($scope, $state, $stateParams, $timeout, Group) {
    $scope.group = new Group({});

    $scope.third_stage = true;
    $scope.four_stage = false;

    $scope.goToView = function() {
        $scope.third_stage = false;
        $scope.four_stage = true;
        $timeout(function() {
            $state.go('group-view', {
                groupId: $scope.group.id
            }); 
        }, 1000);

    };

    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {
        });
    }

    $scope.getGroup();

})



.controller('group-list', ['$scope', '$http', '$auth', '$state', 'GroupPaginate', 'api_host', function($scope, $http, $auth, $state, GroupPaginate, api_host) {
   
    $scope.groups = new GroupPaginate();

    $scope.doFilter = function(filter) {
        console.log(filter);
    };

    $scope.join = function(group_id) {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/group/join/'+group_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'group_join', 
                    type: "info",
                    showcancelbutton: false,
                        animation: false, 
                    closeonconfirm: true 
                });
                $scope.view(winwin_id);

            })
            .error(function(error) {
                swal({
                    title: "ADVERTENCIA", 
                    text: error.message, 
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
        } else {
            $state.go('signIn');
        }
    };

    $scope.view = function(id) {
        console.log('view '+id);
        $state.go('group-view', {
            groupId: id
        }); 
    };



 
}])
.controller('group-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Group', 'Post', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Group, Post, Account, api_host) {

    $scope.edit_user = {};

    $scope.is_admin = false;

    $scope.current_view = 'home';

    $scope.isSponsor = false;
    Account.getProfile().success(function(data) {
        if(data) {
            $scope.account = data.account;
            $scope.profile = data.profile;
            $scope.sponsor = data.sponsor;
            $scope.isSponsor = data.is_sponsor;
    
        }
    });



    $scope.setCurrentView = function(view) {
        $scope.current_view = view;
        $scope.is_admin = view == 'admin';
    };

    $scope.setNormal = function() {
        $scope.is_admin = false;
    };

    $scope.setAdmin = function() {
        if($scope.user_detail.myself) {
            $scope.is_admin = true;
        }
    };


    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {
            $scope.getThread(data.id);
        });
    }

    $scope.getGroup();

    $scope.join = function() {
        $http.get(api_host+'/api/groups/join/'+$scope.group.id).success(function(data) {
            $scope.getGroup();
            swal({
                title: "info", 
                text: 'group_join', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.left = function() {
        $http.get(api_host+'/api/groups/left/'+$scope.group.id).success(function(data) {
            swal({
                title: "info", 
                text: 'group_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.addToGroup = function(winwinId) {
        $http.get(api_host+'/api/groups/'+$scope.group.id+'/add_winwin/'+winwinId).success(function(data) {
            swal({
                title: "info", 
                text: 'winwin_added_to_group', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.removeFromGroup = function(winwinId) {
        $http.get(api_host+'/api/groups/'+$scope.group.id+'/remove_winwin/'+winwinId).success(function(data) {
            swal({
                title: "info", 
                text: 'winwin_removed_from_group', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.viewSponsor= function(id) {
        $state.go('sponsor-view', {
            sponsorId: id
        }); 
    };


    $scope.viewWinwin = function(id) {
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };

    $scope.viewUser = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewGroup = function(id) {
        $state.go('group-view', {
            groupId: id
        }); 
    };

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $('.grid-participantes').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };

    $timeout(function () {
        $('.grid-participantes').isotope({
            itemSelector: '.participante-item',
            masonry: {
                columnWidth: 380
            }
        });
    });

    $scope.editing_conversation = false;
    $scope.conversation = new Post({});

    $scope.newConversation = function() {
        $scope.editing_conversation = true;
    };
    $scope.cancelConversation = function() {
        $scope.editing_conversation = false;
    };

    $scope.newReply = function(conversation) {
        conversation.editing_reply = true;
    };

    $scope.cancelReply = function(conversation) {
        conversation.editing_reply = false;
    };

    $scope.submitConversation = function() {
        console.log('submit');
        $http.post(api_host+'/api/groups/'+$scope.group.id+'/conversation',{
            content: $scope.conversation.content,
            title: $scope.conversation.title
        }).success(function(data) {
            $scope.comments = data;
            $scope.conversation = new Post({});
            $scope.editing_conversation = false;
        })
        .error(function(error) {
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.reply = new Post({});


    $scope.submitReply = function(conversation) {
        console.log('submit');
        $http.post(api_host+'/api/groups/'+$scope.group.id+'/conversation/'+conversation.id,{
            content: $scope.reply.content
        }).success(function(data) {
            $scope.comments = data;
            $scope.reply = new Post({});
            conversation.editing_reply = false;
        })
        .error(function(error) {
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };



    $scope.getThread = function(group_id) {
        $http.get(api_host+'/api/group_thread/'+group_id).success(function(data) {
            $scope.comments = data;
        })
    };


    $scope.follow = function(member) {
        $http.get(api_host+'/api/users/follow/'+member.id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_follow', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.unfollow = function(member) {
        $http.get(api_host+'/api/users/unfollow/'+member.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_unfollow', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getUser();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.askForSponsored = function() {
        swal({
            title: "SOLICITAR PATROCINIO",
            text: "Envia un mensaje de solicitud al administrador del Grupo",
            html: '<p><input id="input-message" placeholder="Mensaje de solicitud"></p>',
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true
        },
        function(){   
            var inputValue = $("#input-message").val();

            if (inputValue === false) 
                return false;      
            if (inputValue === "") {     
                return false;  
            }      
            $http.post('/api/groups/sponsor_request/'+$scope.group.id, {
                body: inputValue
            })
            .success(function(data) {
                $state.go('group-sponsored', {
                    groupId: $scope.group.id,
                }); 
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: error.message, 
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
            return true;

        });
    };


}])
.controller('group-sponsored', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Group', function($scope, $http, $state, $stateParams, $timeout, Group) {

    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {
            $scope.name = data.name;
            $timeout(function() {
                $state.go('group-view', {
                    groupId: $stateParams.groupId
                }); 
            }, 1000);

        });
    };

    $scope.getGroup();

    
}])
.controller('group-config', function($scope, $state, $auth, $timeout, $http,  Upload, Group, Interest, api_host) {

    $scope.doValidate = function() {
        $scope.group.gallery_image = $scope.image_gallery_selected;
        return true;
    };

    $scope.doSave = function() {
        if($scope.doValidate()) {
            $http.post(api_host+'/api/group/'+$scope.group.id, $scope.group)
            .success(function(data) {
                swal({
                    title: "info", 
                    text: 'group_updated', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });

                $state.go('group-view', {
                    groupId: $scope.group.id
                }); 
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: error.message, 
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });


        }
    };


    $scope.uploading = false;

    $scope.uploadFiles = function(file) {
        console.log('uploading');
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/api/winwins/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;
                console.log('succeess');

                $timeout(function () {
                    file.result = response.data;
                    $scope.group.photo = response.data.filename;
                    console.log($scope.group.photo);

                });
            }, function (response) {
                console.log(response);
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };


    $scope.gallery_picker = false;

    $scope.select_gallery = function() {
        $scope.gallery_picker = true;
        if(!$scope.image_gallery_selected) {
            $('#image-gallery').imagepicker({
                changed: function(old, new_value) {
                    if(new_value) {
                        $scope.group.photo = false;
                    }
                    $scope.$apply(function(){
                        $scope.gallery_picker = false;
                    });
                }
            });
        }
    };



});
