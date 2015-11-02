'use strict';

angular.module('winwinsApp')

.controller('winwin-tabs', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', 'Winwin', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, Winwin, Account, api_host) {


    $scope.is_admin = false;

    $scope.current_view = 'home';

    $scope.setCurrentView = function(view) {
        $scope.current_view = view;
        $scope.is_admin = false;
    };

    $scope.setNormal = function() {
        $scope.is_admin = false;
    };

    $scope.setAdmin = function() {
        console.log('is admin? '+$scope.isAdmin);
        if($scope.isAdmin) {
            $scope.is_admin = true;
        }
    };

    $scope.isAdmin = false;

    $scope.winwin_view = true;

    $scope.show_closing_date = false;
    $scope.show_description = false;

    $scope.show_details = function(show) {
        $scope.show_description = show;
    };

    $scope.posts = [];
    $scope.last = {};

    $scope.getPosts = function() {
        $http.get(api_host+'/api/posts/winwin/'+$stateParams.winwinId+'/posts').success(function(data) {
            $scope.posts = data.posts;
            $scope.last = data.last;
        });

    }


    $scope.winwin = {};
    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.winwin = data;
            $scope.calculate_time();
            if($scope.winwin.is_moderator) {
                $scope.isAdmin = true;
            }
            //$scope.getPosts();
        });
    }

    $scope.isSponsor = false;
    Account.getProfile().success(function(data) {
        if(data) {

            $scope.account = data.account;
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

    $scope.viewProfile = function(user_id) {
        console.log('User id: '+user_id);
        $state.go('user-view', {
            userId: user_id
        }); 

    };

    $scope.join = function() {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+$scope.winwin.id).success(function(data) {
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
        $http.get(api_host+'/api/winwins/left/'+$scope.winwin.id).success(function(data) {
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



}])



.controller('winwin-navbar', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', 'Winwin', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, Winwin, Account, api_host) {

        $scope.isAdmin = true;
        if($scope.winwin.is_moderator) {
            $scope.isAdmin = true;
        }

        $scope.goMuro = function() {
            $scope.current_subview = 'muro';
            $scope.isAdmin = false;

            $timeout(function() {
                $state.go('winwin-muro', {
                    winwinId: $scope.winwin.id
                }); 
            }, 500);
        };

        $scope.goMembers = function() {
            console.log('SCope winwin: '+$scope.winwin.id);
            $state.go('winwin-members', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goSponsors = function() {
            $scope.current_subview = 'sponsors';
            $scope.isAdmin = false;
            console.log('SCope winwin: '+$scope.winwin.id);
            $state.go('winwin-sponsors', {
                winwinId: $scope.winwin.id
            }); 
        };

        $scope.goWinwin = function() {
            window.scrollTo(0, 0);
            //$scope.current_subview = 'muro';
            $scope.isAdmin = false;
            $scope.first_view = false;
            $location.hash('winwin-top');
            $anchorScroll();
        };

        $scope.goAdmin = function() {
            if($scope.winwin.is_moderator) {
                $scope.isAdmin = true;
                console.dir($scope.profile);
            } else {
                swal({
                    title: "warning", 
                    text: 'not_is_a_moderator', 
                    type: "warning",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
            }
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

        $scope.goRequestedPatrocinio = function() {
            $state.go('winwin-sponsors-admin', {
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
            $state.go('admin_campanada', {
                winwinId: $scope.winwin.id
            }); 
        };


}])
.controller('winwin-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', 'Winwin', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, Winwin, Account, api_host) {

        $scope.winwin_view = true;

        $scope.show_closing_date = false;
        $scope.show_description = false;

        $scope.show_details = function(show) {
            $scope.show_description = show;
        };

        $scope.posts = [];
        $scope.last = {};

        $scope.getPosts = function() {
            $http.get(api_host+'/api/posts/winwin/'+$stateParams.winwinId+'/posts').success(function(data) {
                $scope.posts = data.posts;
                $scope.last = data.last;
            });

        }


        $scope.winwin = {};
        $scope.getWinwin = function() {
            $scope.winwin = Winwin.get({
                id: $stateParams.winwinId
            }, function(data) {
                $scope.winwin = data;
                $scope.calculate_time();
                //$scope.getPosts();
            });
        }

        $scope.isSponsor = false;
        Account.getProfile().success(function(data) {
            if(data) {

                $scope.account = data.account;
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

        $scope.viewProfile = function(user_id) {
            console.log('User id: '+user_id);
            $state.go('user-view', {
                userId: user_id
            }); 

        };

        $scope.join = function() {
            if($auth.isAuthenticated()) {
                $http.get(api_host+'/api/winwins/join/'+$scope.winwin.id).success(function(data) {
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
            $http.get(api_host+'/api/winwins/left/'+$scope.winwin.id).success(function(data) {
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



}])
.controller('winwin-edit', function($scope, $state, $auth, $timeout, Upload, Winwin, Interest, api_host) {
    $scope.winwin = new Winwin({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.first_stage = true;
    $scope.second_stage = false;

    $scope.winwin.closing_date = new Date();

    $scope.setup_components = function() {
        $('[data-toggle="popover"]').popover();
        console.log('setup component');
    };

    $timeout(function() {
        $scope.setup_components();
    }, 1000);

    $('#datetimepicker1').datetimepicker({
        minDate: new Date(),
        format: 'DD - MM - YYYY'
    });

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doValidateBasic = function() {
        $scope.winwin.closing_date =  $('#datetimepicker1').data("DateTimePicker").date();
        return true;
    };

    $scope.doValidateWinwin = function() {
        $scope.winwin.gallery_image = $scope.image_gallery_selected;
        return true && !$scope.saving;
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
        console.log('do save');
        if($scope.doValidateWinwin()) {
            $scope.saving = true;
            $scope.winwin.$save(function(data) {
                $state.go('winwin-first-post', {
                    winwinId: $scope.winwin.id
                }); 
            });
        }
    };

    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        console.dir(file);
        $scope.f = file;
        console.log(file.$error);
        if (file && !file.$error) {
            console.log('enviando...');
            file.upload = Upload.upload({
                url: api_host+'/api/winwins/upload',
                file: file
            });

            file.upload.then(function (response) {
                console.log('success...');
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.winwin.image = response.data.filename;
                    $scope.preview_image = 'http://images.dev-winwins.net/smart/'+$scope.winwin.image;
                });
            }, function (response) {
                console.log('error...');
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log($scope.errorMsg);
                }
            });

            file.upload.progress(function (evt) {
                console.log('progress...');
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
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
                        $scope.preview_image = 'http://img.youtube.com/vi/'+result+'/default.jpg';
                    });
                } else {
                    console.log('Wrong url');
                }
            }
        });
    };

    $scope.gallery_picker = false;

    $scope.select_gallery = function() {
        $scope.gallery_picker = true;
        if(!$scope.image_gallery_selected) {
            $('#image-gallery').imagepicker({
                changed: function(old, new_value) {
                    $scope.$apply(function(){
                        $scope.gallery_picker = false;
                    });
                }
            });
        }
    };

    $scope.preview_image = '';
    $scope.$watch('image_gallery_selected', function() {
        if($scope.image_gallery_selected) {
            $scope.preview_image = 'http://images.dev-winwins.net/smart/'+$scope.image_gallery_selected;
        }
    });

})
.controller('winwin-first-post', ['$scope', '$stateParams', '$http', '$state', '$auth', '$sce', '$timeout', 'Winwin', 'Account', 'Upload', 'Post', 'api_host', function($scope, $stateParams, $http, $state, $auth, $sce, $timeout, Winwin, Account, Upload, Post, api_host) {
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

    $scope.submitPost = function() {
        console.log('submit');
        console.dir($scope.post);
        $scope.post.$save(function(data) {
            $http.get(api_host+'/api/winwins/activate/'+$scope.winwin.id).success(function(data) {
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

    $scope.continue = function() {
        $state.go('winwin-view', {
            winwinId: $scope.winwin.id
        }); 
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
                        $scope.post.media_type = 'VIDEO';
                        $scope.post.media_path = result;
                    });
                } else {
                    console.log('Wrong url');
                    swal({
                        title: "Incorrecto", 
                        text: "La direccion ingresada no es correcta", 
                        type: "warning"
                    });
                }
            }
        });
    };

    $scope.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+videoId);
    };


    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        console.dir(file);
        $scope.f = file;
        console.log(file.$error);
        if (file && !file.$error) {
            console.log('enviando...');
            file.upload = Upload.upload({
                url: api_host+'/api/posts/upload',
                file: file
            });

            file.upload.then(function (response) {
                console.log('success...');

                $scope.uploading = false;
                $timeout(function () {
                    file.result = response.data;
                    $scope.post.media_id = response.data.media_id;
                    $scope.post.media_type  = 'IMAGE';
                    $scope.post.media_path = response.data.filename;
                });
            }, function (response) {
                console.log('error...');
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                console.log('progress...');
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };


}])
.controller('winwin-promote', ['$scope', '$stateParams', '$http', '$state', '$timeout', 'Winwin', 'Account', function($scope, $stateParams, $http, $state, $timeout, Winwin, Account) {
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
        $scope.promote = false;
        $scope.success = true;
        $timeout(function() {
            $state.go('winwin-view', {
                winwinId: $scope.winwin.id
            }); 
        }, 3000);
    };

    $scope.promote = true;
    $scope.success = false;

}])
.controller('winwin-list', ['$scope', '$http', '$auth', '$state', 'WinwinPaginate', 'api_host', function($scope, $http, $auth, $state, WinwinPaginate, api_host) {
   
    $scope.winwins = new WinwinPaginate();

    $scope.doFilter = function(filter) {
        console.log(filter);
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+winwin_id).success(function(data) {
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
.controller('winwin-search', ['$scope','$http', 'api_host', function($scope, $http, api_host) {

        $scope.winwins = [];

        $scope.do_search = function() {
            $http.get(api_host+'/api/winwins/search/', {
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
.controller('winwin-members', ['$scope','$http', '$timeout', '$stateParams', '$state', 'Winwin', 'api_host', function($scope, $http, $timeout, $stateParams, $state, Winwin, api_host) {

    $scope.members_view = true;

    $scope.current = 'all';

    $scope.winwin = {};
    console.log('State Params: '+$stateParams.winwinId);
    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.winwin = data;

            $timeout(function () {
                
                $('.grid-participantes').isotope({
                    itemSelector: '.participante-item',
                    masonry: {
                        columnWidth: 380
                    }
                });
            }, 1000);
         

        });
    }

    $scope.getWinwin();

   
    $scope.classType = function(participante) {
       return (participante.pivot.moderator ? 'activator' : '')+' '+ (participante.pivot.creator? 'creator' : '');
    }

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $('.grid-participantes').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };

    $scope.follow = function(participante) {
        $http.get(api_host+'/api/users/follow/'+participante.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_following', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            participante.following = true;
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

    $scope.view = function(participante) {
        $state.go('user-view', {
            userId: participante.id
        }); 
    };

    $scope.unfollow = function(participante) {
        $http.get(api_host+'/api/users/unfollow/'+participante.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            participante.following = false;
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



}])
.controller('winwin-sponsors', ['$scope','$http', '$timeout', '$stateParams', 'Winwin', 'api_host', function($scope, $http, $timeout, $stateParams, Winwin, api_host) {

    $scope.current = 'all';
    $scope.sponsors_view = true;

    $scope.winwin = {};
    $scope.getWinwin = function() {
        $http.get(api_host+'/api/winwins/'+$stateParams.winwinId+'/sponsors').success(function(data) {
            $scope.winwin = data;
            $timeout(function () {
                $('.grid-sponsors').isotope({
                    itemSelector: '.sponsor-item',
                    masonry: {
                        columnWidth: 380
                    }
                });
            }, 1000);
        });
    }

    $scope.getWinwin();

    $scope.classType= function(sponsor) {
       return (sponsor.pivot.promoted ? 'promoted' : '');
    }

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $('.grid-sponsors').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };


    $scope.follow = function(sponsor) {
        $http.get(api_host+'/api/sponsors/follow/'+sponsor.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_following', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            sponsor.following = true;
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

    $scope.view = function(sponsor) {
        $state.go('sponsor-view', {
            userId: sponsor.id
        }); 
    };

    $scope.unfollow = function(sponsor) {
        $http.get(api_host+'/api/users/unfollow/'+sponsor.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            sponsor.following = false;
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




}])
.controller('winwin-muro', ['$scope','$http', '$stateParams', '$sce', '$timeout', 'Winwin', 'Account', 'Upload', 'Post', 'api_host', function($scope, $http, $stateParams, $sce, $timeout, Winwin, Account, Upload, Post, api_host) {

    $scope.muro_view =  true;

    $scope.winwin = {};
    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.winwin = data;
            $scope.getPosts();
        });
    }


    $scope.getPosts = function() {
        $http.get(api_host+'/api/posts/winwin/'+$stateParams.winwinId+'/posts').success(function(data) {
            $scope.posts = data.posts;
            $scope.last = data.last;
            $scope.post = new Post({});
            $scope.editing = false
        });

    }

    $scope.getWinwin();

    $scope.post = new Post({});
    $scope.profile = {};

    $scope.isSponsor = false;
    Account.getProfile().success(function(data) {
        if(data) {
            $scope.profile = data.profile;
            $scope.isSponsor = data.sponsor;
        }
    });

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
                        $scope.post.media_type = 'VIDEO';
                        $scope.post.media_path = result;
                    });
                } else {
                    console.log('Wrong url');
                    swal({
                        title: "Incorrecto", 
                        text: "La direccion ingresada no es correcta", 
                        type: "warning"
                    });
                }
            }
        });
    };

    $scope.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+videoId);
    };


    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        console.dir(file);
        $scope.f = file;
        console.log(file.$error);
        if (file && !file.$error) {
            console.log('enviando...');
            file.upload = Upload.upload({
                url: api_host+'/api/posts/upload',
                file: file
            });

            file.upload.then(function (response) {
                console.log('success...');
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.post.media_id = response.data.media_id;
                    $scope.post.media_type  = 'IMAGE';
                    $scope.post.media_path = response.data.filename;
                });
            }, function (response) {
                console.log('error...');
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                console.log('progress...');
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };

    $scope.cancelEditing = function() {
        $scope.normal_size = true;
        $scope.post = new Post({});
        $scope.editing = false;
    };

    $scope.submitPost = function() {
        console.log('submit post');
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
            $scope.normal_size = true;
            $scope.editing = false;

            $scope.getPosts();
        });
    };

    $scope.normal_size = true;
    $scope.editing = false;

    $scope.min_size = function() {
        $scope.normal_size = true;
    };

    $scope.max_size = function() {
        $scope.normal_size = false;
        $scope.editing = true;
    };

    $scope.voteUp = function(post) {

    };

    $scope.voteDown = function(post) {

    };

    $scope.reply = function(post) {
        post.isReplying = true;
    };

    $scope.cancelReply = function(post) {
        post.isReplying = false;
    };


}])
.controller('winwin-campanada', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Winwin', 'api_host', function($scope, $http, $state, $stateParams, $timeout, Winwin, api_host) {

    $scope.campanada_view = true;
    $scope.campanada_success = false;

    $scope.winwin = {};
    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.winwin = data;
        });
    }

    $scope.getWinwin();

    $scope.sentCampanada = function() {
        $http.post('/api/winwins/campanada/'+$scope.winwin.id,
             {body: $scope.body}
        )
        .success(function(data) {
            $scope.campanada_success = false;
            $timeout(function () {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }); 
            }, 4000);

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

}])
.controller('winwin-configuracion', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
}])
.controller('winwin-patrocinio', ['$scope','$http', '$stateParams', 'Winwin', function($scope, $http, $stateParams, Winwin) {
}])
.controller('winwin-sponsor-request', ['$scope','$http', '$state', '$stateParams', 'Winwin', function($scope, $http, $state, $stateParams, Winwin) {

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
 
}])
.controller('back_winwin-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', 'Winwin', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, Winwin, Account, api_host) {

        $scope.show_closing_date = false;
        $scope.show_description = false;

        $scope.show_details = function(show) {
            $scope.show_description = show;
        };

        $scope.posts = [];
        $scope.last = {};

        $scope.getPosts = function() {
            $http.get(api_host+'/api/posts/winwin/'+$stateParams.winwinId+'/posts').success(function(data) {
                $scope.posts = data.posts;
                $scope.last = data.last;
            });

        }


        $scope.winwin = {};
        $scope.getWinwin = function() {
            $scope.winwin = Winwin.get({
                id: $stateParams.winwinId
            }, function(data) {
                $scope.winwin = data;
                $scope.calculate_time();
                $scope.getPosts();
            });
        }

        $scope.isSponsor = false;
        Account.getProfile().success(function(data) {
            if(data) {

                $scope.account = data.account;
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

        $scope.viewProfile = function(user_id) {
            console.log('User id: '+user_id);
            $state.go('user-view', {
                userId: user_id
            }); 

        };

        $scope.join = function() {
            if($auth.isAuthenticated()) {
                $http.get(api_host+'/api/winwins/join/'+$scope.winwin.id).success(function(data) {
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
            $http.get(api_host+'/api/winwins/left/'+$scope.winwin.id).success(function(data) {
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
        $scope.up_down = true;

        $scope.setup_components = function() {
        
            var scope = $scope;
            $timeout(function() {
                scope.view_height = $('winwin-view').height();
                $scope.height_to_change = scope.view_height * 1.4;
                scope.height_to_change = scope.view_height;

                $(window).scroll(function(){                          
                    if ($(this).scrollTop() > $scope.view_height) {
                        $('#menu-winwin').fadeIn(1);
                        if($scope.first_view) {
                            $scope.first_view = false;
                            $scope.goMuro();
                        }
                        if($scope.up_down) {
                            $scope.up_down = false;
                            $("html, body").animate({ scrollTop: 430 }, 0);
                        } 
                    } else {
                        $('#menu-winwin').fadeOut(1);
                        $scope.up_down = true;
                    }
                });
            }, 1000);
        };

        $scope.setup_components();

        $scope.current_subview = 'muro';

        $scope.goMuro = function() {
            $scope.current_subview = 'muro';
            $scope.isAdmin = false;

            $timeout(function() {
                $state.go('winwin-view.muro', {
                    winwinId: $scope.winwin.id
                }); 
            }, 500);
        };

        $scope.goMembers = function() {
            $state.go('winwin-members', {
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
            window.scrollTo(0, 0);
            //$scope.current_subview = 'muro';
            $scope.isAdmin = false;
            $scope.first_view = false;
            $location.hash('winwin-top');
            $anchorScroll();
        };

        $scope.goAdmin = function() {
            if($scope.winwin.is_moderator) {
                $scope.isAdmin = true;
                console.dir($scope.profile);
            } else {
                swal({
                    title: "warning", 
                    text: 'not_is_a_moderator', 
                    type: "warning",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
            }
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


;

