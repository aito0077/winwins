'use strict';

angular.module('winwinsApp')
.controller('group-edit', function($scope, $state, $auth, Upload, Group, Interest) {
    $scope.group = new Group({});

    $scope.doValidate = function() {
        return true;
    };

    $scope.doSave = function() {
        if($scope.doValidate()) {
            $scope.group.$save(function(data) {
                $state.go('group-view', {
                    groupId: $scope.group.id
                }); 
            });
        }
    };

    $scope.files = [];

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
         if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/winwins/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.group.photo = data.filename;
                });
            }
        }
    };

})
.controller('group-list', ['$scope', '$http', '$auth', '$state', 'GroupPaginate', function($scope, $http, $auth, $state, GroupPaginate) {
   
    $scope.groups = new GroupPaginate();

    $scope.doFilter = function(filter) {
        console.log(filter);
    };

    $scope.join = function(group_id) {
        if($auth.isAuthenticated()) {
            $http.get('/api/group/join/'+group_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'group_join', 
                    type: "info",
                    showcancelbutton: false,
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
.controller('group-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Group', 'Post', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Group, Post) {

    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {
            $scope.getThread(data.id);
        });
    }

    $scope.getGroup();

    $scope.join = function() {
        $http.get('/api/groups/join/'+$scope.group.id).success(function(data) {
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
        $http.get('/api/groups/left/'+$scope.group.id).success(function(data) {
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
        $http.get('/api/groups/'+$scope.group.id+'/add_winwin/'+winwinId).success(function(data) {
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
        $http.get('/api/groups/'+$scope.group.id+'/remove_winwin/'+winwinId).success(function(data) {
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
        $http.post('/api/groups/'+$scope.group.id+'/conversation',{
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
        $http.post('/api/groups/'+$scope.group.id+'/conversation/'+conversation.id,{
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
        $http.get('/api/group_thread/'+group_id).success(function(data) {
            $scope.comments = data;
        })
    };
}]);
