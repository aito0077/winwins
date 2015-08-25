'use strict';

angular.module('winwinsApp')
.controller('winwin-edit', function($scope, $state, $auth, Upload, Winwin, Interest) {
    $scope.winwin = new Winwin({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.first_stage = true;
    $scope.second_stage = false;

    $scope.winwin.closing_date = new Date();

    $('#datetimepicker1').datetimepicker({
        minDate: new Date(),
        format: 'DD MM YYYY'
    });

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doValidateBasic = function() {
        $scope.winwin.closing_date =  $('#datetimepicker1').data("DateTimePicker").date();
        console.dir($scope.winwin.closing_date);

        return true;
    };

    $scope.persistBasic = function() {
        console.log('persist basic');
        if($scope.doValidateBasic()) {
            $scope.first_stage = false;
            $scope.second_stage = true;
            console.log('First Stage: '+$scope.first_stage);
            console.log('Second Stage: '+$scope.second_stage);
        }
    }

    $scope.doSave = function() {
        $scope.winwin.$save(function(data) {
            $state.go('winwin-first-post', {
                winwinId: $scope.winwin.id
            }); 
        });
    };

    $scope.uploading = false;
    $scope.files = [];

    $scope.$watch('files', function () {
        console.log('watch files');
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
         if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/winwins/upload',
                    method: 'POST',
                    fields: {},
                    file: file,
                    fileFormDataName: 'myFile'
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.uploading = true;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    console.dir(data);
                    $scope.uploading = false;
                    $scope.winwin.image = data.filename;
                }).error(function() {
                    $scope.uploading = false;
                });
            }
        }
    };

    $scope.matchYoutubeUrl = function(url){
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false ;
    }

    $scope.setVideoUrl = function() {
        console.log('set video');
        swal({
            title: "Video Link", 
            text: "Ingresa dirección de video:", 
            type: "input",
            inputType: "url",
            showCancelButton: true,
            closeOnConfirm: true 
        }, function(inputValue) {
            if(inputValue) {
                var result = $scope.matchYoutubeUrl(inputValue);
                if(result) {
                    $scope.$apply(function(){
                        $scope.winwin.video = result;
                    });
                    console.log('Winwin video: '+result);
                } else {
                    console.log('Wrong url');
                }
            }
        });
    };

})
.controller('winwin-first-post', ['$scope', '$stateParams', '$http', '$state', '$auth', 'Winwin', 'Account', 'Post', function($scope, $stateParams, $http, $state, $auth, Winwin, Account, Post) {
    console.dir($stateParams); 

    $scope.post = new Post({});
    $scope.profile = {};
    $scope.winwin = {};

    Account.getProfile().success(function(data) {
        if(data) {
            $scope.profile = data.profile;
        }
    });

    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
        $scope.post.reference_id = winwin.id;
        $scope.post.type = 'WINWIN';
    });

    $scope.setVideoUrl = function() {
        swal({
            title: "Video Link", 
            text: "Ingresa dirección de video:", 
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true 
        }, function(inputValue) {
            $scope.video = inputValue;
        });
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
                    url: '/api/post/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.post.media_id = data.media_id;
                });
            }
        }
    };

    $scope.submitPost = function() {
        console.log('submit');
        console.dir($scope.post);
        $scope.post.$save(function(data) {
            $http.get('/api/winwins/activate/'+$scope.winwin.id).success(function(data) {
                swal({
                    title: "Info", 
                    text: 'winwin_activated', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
                $state.go('winwin-promote', {
                    winwinId: $scope.winwin.id
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
        
        });
    };




}])
.controller('winwin-promote', ['$scope', '$stateParams', '$http', '$state', 'Winwin', 'Account', function($scope, $stateParams, $http, $state, Winwin, Account) {
    $scope.profile = {};
    $scope.winwin = {};

    Account.getProfile().success(function(data) {
        if(data) {
            $scope.profile = data.profile;
        }
    });

    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });

    $scope.goView = function() {
        $state.go('winwin-view', {
            winwinId: $scope.winwin.id
        }); 
    };

}])
.controller('winwin-list', ['$scope', '$http', '$auth', '$state', 'WinwinPaginate', function($scope, $http, $auth, $state, WinwinPaginate) {
   
    $scope.winwins = new WinwinPaginate();

    $scope.doFilter = function(filter) {
        console.log(filter);
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get('/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
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
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };




}])
.controller('winwin-search', ['$scope','$http', function($scope, $http) {

        $scope.winwins = [];

        $scope.do_search = function() {
            $http.get('/api/winwins/search/', {
                    params: {
                        q: $scope.query
                    }
                })
                .success(function(data) {
                    $scope.winwins = data;
                })
                .error(function(error) {
                    //ToDo: error
                });
        };

        
}])
.controller('winwin-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', 'Winwin', 'Account', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, Winwin, Account) {

        $scope.main_view = true;
        $scope.show_closing_date = false;

        $scope.winwin = {};
        $scope.getWinwin = function() {
            $scope.winwin = Winwin.get({
                id: $stateParams.winwinId
            }, function(data) {
                $scope.winwin = data;
                $scope.calculate_time();
            });
        }

        $scope.isSponsor = false;
        Account.getProfile().success(function(data) {
            if(data) {
                $scope.profile = data.profile;
                $scope.isSponsor = data.sponsor;
            }
        });



        $scope.duration_days = 0;
        $scope.duration_hours = 0;
        $scope.duration_minutes = 0;

        $scope.calculate_time = function() {
            var now = moment(),
                closing_date = moment($scope.winwin.closing_date);

            $scope.show_closing_date = false;

            if($scope.winwin.closing_date && closing_date.isAfter(now) ) {
                $scope.duration_days = closing_date.diff(now, 'days');
                console.log($scope.duration_days);
                $scope.duration_hours = closing_date.diff(now.add($scope.duration_days, 'days'), 'hours');
                console.log($scope.duration_hours);
                var duration_minutes = closing_date.diff(now.add($scope.duration_days, 'days').add($scope.duration_hours, 'hours'), 'minutes');
                $scope.duration_minutes = duration_minutes < 0 ? 0 : duration_minutes;

                console.log($scope.duration_minutes);
                $scope.show_closing_date = true;
            }
        };

        $scope.getWinwin();


        $scope.join = function() {
            if($auth.isAuthenticated()) {
                $http.get('/api/winwins/join/'+$scope.winwin.id).success(function(data) {
                    //ToDo: Te uniste
                    $scope.getWinwin();
                    swal({
                        title: "info", 
                        text: 'winwin_join', 
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
            } else {
                $state.go('signIn');
            }
        };

        $scope.pass = function() {
            $state.go('winwin-list'); 
        };

        $scope.left = function() {
            $http.get('/api/winwins/left/'+$scope.winwin.id).success(function(data) {
                //ToDo: dejaste el ww
                $scope.getWinwin();
                swal({
                    title: "info", 
                    text: 'winwin_left', 
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
        $scope.first_view = true;

        $scope.setup_components = function() {
        
            var scope = $scope;
            $timeout(function() {
                scope.view_height = $('winwin-view').height();
                $scope.height_to_change = scope.view_height * 1.5;
                scope.height_to_change = scope.view_height;

                $(window).scroll(function(){                          
                    if ($(this).scrollTop() > $scope.view_height) {
                        $('#menu-winwin').fadeIn(500);
                        if($scope.first_view) {
                            $scope.first_view = false;
                            $scope.goMuro();
                        }
                    } else {
                        $('#menu-winwin').fadeOut(500);
                    }
                });
            }, 1000);
        };

        $scope.setup_components();

        $scope.current_subview = 'muro';

        $scope.goMuro = function() {
            $scope.current_subview = 'muro';
            $scope.isAdmin = false;
            $state.go('winwin-view.muro', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goMembers= function() {
            $scope.current_subview = 'members';
            $scope.isAdmin = false;
            $state.go('winwin-view.members', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goSponsors = function() {
            $scope.current_subview = 'sponsors';
            $scope.isAdmin = false;
            $state.go('winwin-view.sponsors', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goWinwin = function() {
            $scope.current_subview = 'muro';
            $scope.isAdmin = false;
            $location.hash('winwin-view');
            $anchorScroll();
        };

        $scope.goAdmin = function() {
            $scope.isAdmin = true;
        };

        $scope.goPatrocinio = function() {
            $scope.current_subadmin = 'patrocinio';
            $state.go('winwin-view.admin_patrocinio', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goRequestPatrocinio = function() {
            $scope.current_subview = 'sponsor';
            $state.go('winwin-view.winwin-sponsor-request', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goMiembros = function() {
            $scope.current_subadmin = 'miembros';
            $state.go('winwin-view.admin_miembros', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goConfiguracion = function() {
            $scope.current_subadmin = 'configuracion';
            $state.go('winwin-view.admin_configuracion', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goCampanada = function() {
            $scope.current_subadmin = 'campanada';
            $state.go('winwin-view.admin_campanada', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.isAdmin = false;

        $scope.next = function() {
            console.log('next');
            if($scope.winwin.next_id) {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.next_id
                }); 
            }
        };

        $scope.previous = function() {
            console.log('back');

            if($scope.winwin.previous_id) {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.previous_id
                }); 
            }
        };


}])
.controller('winwin-members', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });

}])
.controller('winwin-sponsors', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });
}])
.controller('winwin-muro', ['$scope','$http', '$stateParams', 'Winwin', 'Account', 'Post', function($scope, $http, $stateParams, Winwin, Account, Post) {
    $scope.posts = [];
    $scope.last = {};

    $http.get('http://winwins.app/api/posts/winwin/'+$stateParams.winwinId+'/posts').success(function(data) {
        $scope.posts = data.posts;
        $scope.last = data.last;
    });

    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
        //$scope.posts = winwin.posts;
    });

    $scope.post = new Post({});
    $scope.profile = {};
    $scope.winwin = {};

    $scope.isSponsor = false;
    Account.getProfile().success(function(data) {
        if(data) {
            $scope.profile = data.profile;
            $scope.isSponsor = data.sponsor;
        }
    });

    $scope.setVideoUrl = function() {
        swal({
            title: "Video Link", 
            text: "Ingresa dirección de video:", 
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true 
        }, function(inputValue) {
            $scope.video = inputValue;
        });
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
                    url: '/api/post/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.post.media_id = data.media_id;
                });
            }
        }
    };

    $scope.submitPost = function() {
        $scope.post.reference_id = $scope.winwin.id;
        $scope.post.type = 'WINWIN';
        console.dir($scope.post);
        $scope.post.$save(function(data) {
            swal({
                title: "Info", 
                text: 'post_send', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        });
    };





}])
.controller('winwin-campanada', ['$scope','$http', '$state', '$stateParams', 'Winwin', function($scope, $http, $state, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });

    $scope.sentCampanada = function() {
        $http.post('/api/winwins/campanada/'+$scope.winwin.id,
             {body: $scope.body}
        )
        .success(function(data) {
            swal({
                title: "Info", 
                text: 'campanada_sent', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $state.go('winwin-view', {
                winwinId: $scope.winwin.id
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
 
}])
.controller('winwin-miembros', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });
}])
.controller('winwin-configuracion', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });
}])
.controller('winwin-patrocinio', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });
}])
.controller('winwin-sponsor-request', ['$scope','$http', '$state', '$stateParams', 'Winwin', function($scope, $http, $state, $stateParams, Winwin) {
    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
    });

    $scope.sentRequest = function() {
        $http.post('/api/winwins/sponsor_request/'+$scope.winwin.id,
             {body: $scope.body}
        )
        .success(function(data) {
            swal({
                title: "Info", 
                text: 'sponsor_request_sent', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $state.go('winwin-view', {
                winwinId: $scope.winwin.id
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
 
}]);

