'use strict';

angular.module('winwinsApp')

.controller('winwin-tabs', ['$scope','$http', '$state', '$sce', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', '$uibModal', '$rootScope', 'Winwin', 'Account', 'api_host', function($scope, $http, $state, $sce, $stateParams, $timeout, $anchorScroll, $location, $auth, $uibModal, $rootScope, Winwin, Account, api_host) {


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

    };

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

            console.log($stateParams.actionJoin);
            if($stateParams.actionJoin) {
                $scope.join();
            }
        });
    }


    $scope.isSponsor = false;
    Account.getProfile().success(function(data) {
        if(data) {

            $scope.account = data.account;
            $scope.profile = data.profile;
            $scope.sponsor = data.sponsor;
            $scope.isSponsor = data.is_sponsor;
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
            $scope.duration_hours = closing_date.diff(now.add($scope.duration_days, 'days'), 'hours');
            var duration_minutes = closing_date.diff(now.add($scope.duration_days, 'days').add($scope.duration_hours, 'hours'), 'minutes');
            $scope.duration_minutes = duration_minutes < 0 ? 0 : duration_minutes;

            $scope.show_closing_date = true;
        } else {
            if($scope.winwin.closing_date && !closing_date.isAfter(now) ) {
                $scope.is_finished = true;
            }
        }
    };

    $scope.getWinwin();

    $scope.viewProfile = function(user_id) {
        $state.go('user-view', {
            userId: user_id
        }); 

    };

    $scope.join = function() {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+$scope.winwin.id).success(function(data) {
                //ToDo: Te uniste
                $state.go('winwin-joined', {
                    winwinId: $scope.winwin.id,
                    winwinName: $scope.winwin.title
                }); 

            })
            .error(function(error) {
                swal({
                    title: "ADVERTENCIA", 
                    text: 'Error al unirse.',
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
        } else {

            $rootScope.returnState = {
                state: 'ww-join',
                parameters: {
                    winwinId: $scope.winwin.id
                }
            };

            $state.go('signIn');
        }
    };

    $scope.pass = function() {
        $state.go('winwin-list'); 
    };

    $scope.left = function() {
        $http.get(api_host+'/api/winwins/left/'+$scope.winwin.id).success(function(data) {
            //ToDo: dejaste el ww
            $state.go('winwin-left', {
                winwinId: $scope.winwin.id,
                winwinName: $scope.winwin.title
            }); 

        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al abandonar.',
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


    $scope.askForSponsored = function() {
        swal({
            title: "SOLICITAR PATROCINIO",
            text: "Envia un mensaje de solicitud al creador del Winwin",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            inputPlaceholder: "Mensaje de solicitud" 
        },
        function(inputValue){   
            if (inputValue === false) 
                return false;      
            if (inputValue === "") {     
                return false;  
            }      
            $http.post(api_host+'/api/winwins/sponsor_request/'+$scope.winwin.id, {
                body: inputValue
            })
            .success(function(data) {
                $state.go('winwin-sponsored', {
                    winwinId: $scope.winwin.id,
                    winwinName: $scope.winwin.title
                }); 
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: 'Error en la peticion.',
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
            return true;

        });
    };

    $scope.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId+'?autoplay=1');
    };

    $scope.openMailModal = function(winwin) {
        $scope.toShare = winwin;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'myMailShare.html',
            controller: 'ModalMailCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                },
                mails: function () {
                    return {};
                }
            }
        });
    };


}])

.controller('winwin-left', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Winwin', function($scope, $http, $state, $stateParams, $timeout, Winwin) {

    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.title = data.title;
            $timeout(function() {
                $state.go('main'); 
            }, 1000);

        });
    };

    $scope.getWinwin();

}])
.controller('winwin-joined', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Winwin', function($scope, $http, $state, $stateParams, $timeout, Winwin) {

    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.title = data.title;
            $timeout(function() {
                $state.go('winwin-promote', {
                    winwinId: $stateParams.winwinId
                }); 
            }, 1000);

        });
    };

    $scope.getWinwin();

}])
.controller('winwin-sponsored', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Winwin', function($scope, $http, $state, $stateParams, $timeout, Winwin) {

    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.title = data.title;
            $timeout(function() {
                $state.go('winwin-view', {
                    winwinId: $stateParams.winwinId
                }); 
            }, 1000);

        });
    };

    $scope.getWinwin();

    

}])
.controller('winwin-edit', function($scope, $state, $auth, $timeout, Upload, Winwin, Interest, api_host) {
    $scope.winwin = new Winwin({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.first_stage = true;
    $scope.second_stage = false;

    $scope.winwin.closing_date = new Date();

    $scope.setup_components = function() {
        jQuery('[data-toggle="popover"]').popover();
        jQuery('[data-toggle="tooltip"]').tooltip()

        jQuery('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });
        jQuery('input#input_text, textarea#textarea1').characterCounter();
        jQuery('input#input_text, textarea#textarea2').characterCounter();
        jQuery('.modal-trigger').leanModal();
    };

    $timeout(function() {
        $scope.setup_components();
    }, 1000);

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doValidateBasic = function() {
        return true;
    };

    $scope.doValidateWinwin = function() {
        $scope.winwin.gallery_image = $scope.image_gallery_selected;
        return true && !$scope.saving;
    };



    $scope.persistBasic = function() {
        if($scope.doValidateBasic()) {
            $scope.first_stage = false;
            $scope.second_stage = true;
            console.log('Second Stage: '+$scope.second_stage);
            $("html, body").animate({ scrollTop: 1 }, 0);
        }
    }

    $scope.doSave = function() {
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
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: api_host+'/api/winwins/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.winwin.image = response.data.filename;
                    $scope.preview_image = 'http://images.dev-winwins.net/smart/'+$scope.winwin.image;
                });
            }, function (response) {
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                    swal({
                        title: "Error", 
                        text: 'Error al subir archivo', 
                        type: "warning",
                        showCancelButton: false,
                        closeOnConfirm: true 
                    });

                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
        if (file.$error == 'maxSize') {
            swal({
                title: "Error", 
                text: "La imagen es demasiado grande",
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        }
    };


    $scope.matchYoutubeUrl = function(url){
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false ;
    }

    $scope.setVideoUrl = function() {
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
                }
            }
        });
    };

    $scope.gallery_picker = false;

    $scope.select_gallery = function() {
        $scope.gallery_picker = !$scope.gallery_picker;
        
        if(!$scope.image_gallery_selected) {
            jQuery('#image-gallery').imagepicker({
                changed: function(old, new_value) {
                    $scope.image_gallery_selected = new_value;
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
            $scope.$apply();
        }
    });

})
.controller('winwin-first-post', ['$scope', '$stateParams', '$http', '$state', '$auth', '$sce', '$timeout', 'Winwin', 'Account', 'Upload', 'Post', 'api_host', function($scope, $stateParams, $http, $state, $auth, $sce, $timeout, Winwin, Account, Upload, Post, api_host) {

    $scope.ww_saved = false;
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
        $scope.post.$save(function(data) {
            $http.get(api_host+'/api/winwins/activate/'+$scope.winwin.id).success(function(data) {
                //$scope.ww_saved = true;

                //$timeout(function() {
                    $state.go('winwin-promote', {
                        winwinId: $scope.winwin.id
                    }); 
                //}, 1000);
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: 'Error al enviar post', 
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
        $scope.f = file;
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
.controller('winwin-promote', ['$scope', '$stateParams', '$http', '$state', '$timeout', '$uibModal', 'Winwin', 'Account', function($scope, $stateParams, $http, $state, $timeout, $uibModal, Winwin, Account) {
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
        }, 1000);
    };

    $scope.promote = true;
    $scope.success = false;


    $scope.openMailModal = function(winwin) {
        $scope.toShare = winwin;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'myMailShare.html',
            controller: 'ModalMailCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                },
                mails: function () {
                    return {};
                }
            }
        });
    };




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
                    text: 'Te has unido al Winwin', 
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
                    text: 'Error al unirse', 
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

    //$scope.setCurrentView('users');
    $scope.members_view = true;

    $scope.current = 'all';

    $timeout(function () {
        
        $('.grid-participantes').isotope({
            itemSelector: '.participante-item',
            masonry: {
                columnWidth: 380
            }
        });
    }, 1000);
 

    $scope.classType = function(participante) {
       return (participante.pivot.moderator ? 'activator' : '')+' '+ (participante.pivot.creator? 'creator' : '');
    }

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $('.grid-participantes').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };


    $scope.makeNormal = function(participante) {
        $scope.activated_name = participante.username;
        $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/state/normal/'+participante.id).success(function(data) {
            $scope.in_message = true;
            $scope.normal_success = true;
            $timeout(function() {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }, {reload: true}); 
            }, 1000);
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al quitar privilegios', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


    $scope.makeActivator = function(participante) {
        $scope.activated_name = participante.username;
        $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/state/activator/'+participante.id).success(function(data) {
            $scope.in_message = true;
            $scope.activator_success = true;
            $timeout(function() {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }, {reload: true}); 
            }, 1000);
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al agregar privilegios', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };



    $scope.follow = function(participante) {
        $http.get(api_host+'/api/users/follow/'+participante.id).success(function(data) {
            swal({
                title: "info", 
                text: 'Siguiendo!', 
                type: "info",
                showcancelbutton: false,
                animation: false, 
                closeonconfirm: true 
            });
            participante.following = true;
            participante.followers_amount = participante.followers_amount + 1;
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al seguir', 
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
                text: 'Has dejado de seguir al usuario', 
                type: "info",
                showcancelbutton: false,
                animation: false, 
                closeonconfirm: true 
            });
            participante.following = false;
            participante.followers_amount = participante.followers_amount - 1;
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al dejar de seguir', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };



}])
.controller('winwin-sponsors', ['$scope','$http', '$timeout', '$stateParams', 'Winwin', 'api_host', function($scope, $http, $timeout, $stateParams, Winwin, api_host) {

    //$scope.setCurrentView('sponsors');
    $scope.current = 'all';
    $scope.sponsors_view = true;
    $scope.sponsors = [];

    $scope.getWinwin = function() {
        $http.get(api_host+'/api/winwins/'+$stateParams.winwinId+'/sponsors').success(function(data) {
            $scope.sponsors = _.filter(data, function(model) {
                return model.pivot.ww_accept == 1 && model.pivot.sponsor_accept == 1;
            });
            
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
                text: 'Siguiendo!', 
                type: "info",
                showcancelbutton: false,
                        animation: false, 
                closeonconfirm: true 
            });
            sponsor.following = true;
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al seguir', 
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
                text: 'Has dejado de seguir al usuario', 
                type: "info",
                showcancelbutton: false,
                        animation: false, 
                closeonconfirm: true 
            });
            sponsor.following = false;
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: 'Error al dejar de seguir', 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


}])
.controller('winwin-sponsors-to-request', ['$scope','$http', '$state', '$timeout', '$stateParams', 'Winwin', 'api_host', function($scope, $http, $state, $timeout, $stateParams, Winwin, api_host) {

    $scope.sponsors = [];

    $scope.getCandidates = function() {
        $http.get(api_host+'/api/winwins/'+$stateParams.winwinId+'/sponsors/candidates').success(function(data) {
            $scope.sponsors = data;
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

    $scope.getCandidates();

    $scope.view = function(sponsor) {
        $state.go('sponsor-view', {
            userId: sponsor.id
        }); 
    };

    $scope.request_success = false;

    $scope.requestSponsor = function(sponsor) {
        $scope.sponsor_name = sponsor.name;
        swal({
            title: "SOLICITAR PATROCINIO",
            text: "Envia un mensaje de solicitud al Sponsor",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            inputPlaceholder: "Mensaje de solicitud" 
        },
        function(inputValue){   
            if (inputValue === false) 
                return false;      
            if (inputValue === "") {     
                return false;  
            }      
            $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/sponsor/request/'+sponsor.id, {
                body: inputValue
            })
            .success(function(data) {

                $scope.request_success = true;
                $timeout(function () {
                    $state.go('winwin-view', {
                        winwinId: $scope.winwin.id
                    }, {reload: true}); 
                }, 1000);



                $state.go('winwin-sponsored', {
                    winwinId: $scope.winwin.id,
                    winwinName: $scope.winwin.title
                }); 
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: 'Error al solicitar sponsoreo', 
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
            });
            return true;

        });
    };





}])



.controller('winwin-sponsors-requests', ['$scope','$http', '$state', '$timeout', '$stateParams', 'Winwin', 'api_host', function($scope, $http, $state, $timeout, $stateParams, Winwin, api_host) {

    $scope.sponsors = [];

    $scope.getRequests = function() {
        $http.get(api_host+'/api/winwins/'+$stateParams.winwinId+'/sponsors').success(function(data) {
            $scope.sponsors = _.filter(data, function(model) {
                return model.pivot.ww_accept == 0 && model.pivot.sponsor_accept == 1;
            });
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

    $scope.getRequests();

    $scope.view = function(sponsor) {
        $state.go('sponsor-view', {
            userId: sponsor.id
        }); 
    };

    $scope.accept_success = false;
    $scope.acceptSponsor = function(sponsor) {
        $scope.sponsor_name = sponsor.name;
        $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/sponsor/'+sponsor.id+'/accept').success(function(data) {
            $scope.accept_success = true;
            $timeout(function () {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }, {reload: true}); 
            }, 1000);

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
.controller('winwin-muro', ['$scope','$http', '$auth', '$stateParams', '$sce', '$timeout', '$uibModal', 'Winwin', 'Account', 'Upload', 'Post', 'api_host', function($scope, $http, $auth, $stateParams, $sce, $timeout, $uibModal, Winwin, Account, Upload, Post, api_host) {

    //$scope.setCurrentView('wall');

    $scope.muro_view =  true;

    $scope.isAuthenticated = $auth.isAuthenticated();

    $scope.winwin = {};
    $scope.getWinwin = function() {
        console.log('Winwin fetch');
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {
            $scope.winwin = data;
            $scope.polls = $scope.winwin.polls;
            $scope.loadPolls();
            $scope.getPosts();
        });
    }


    $scope.loadPolls = function() {
        _.each($scope.polls, function(poll) {
            $http.get(api_host+'/api/polls/'+poll.id).success(function(data) {
                poll.data = data;
                poll.data.loaded = true;
            });
        });
    };

    $scope.selectAnswer = function(poll, answer) {
       poll.selected_answer = answer.id; 
    };

    $scope.percentage_votes = function(poll, answer) {
        if(!poll.data.total_votes) {
            return 0;
        }
        var result = (answer.vote_count * 100 / poll.data.total_votes);
        return result;
    };

    $scope.votePoll = function(poll) {
        $http.post(api_host+'/api/poll/'+poll.id+'/vote/'+poll.selected_answer,{
            positive: true 
        }).success(function(data) {
            $scope.loadPolls();
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

    $scope.getPosts = function() {
        console.log('get posts');
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
        $scope.post.media_type  = 'IMAGE';
        $scope.f = file;
        console.log(file.$error);
        if (file && !file.$error) {
            $scope.uploading = true;
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
                    $scope.$apply(function(){
                        $scope.post.media_id = response.data.media_id;
                        $scope.post.media_type  = 'IMAGE';
                        $scope.post.media_path = response.data.filename;
                    });
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

    $scope.sendingPost = false;
    $scope.submitPost = function() {
        if($scope.sendingPost) {
            return;
        }
        $scope.sendingPost = true;
        $scope.post.reference_id = $scope.winwin.id;
        $scope.post.type = 'WINWIN';
        $scope.post.$save(function(data) {
            $scope.sendingPost = false;
            swal({
                title: "Info", 
                text: 'Post enviado!', 
                type: "info",
                showcancelbutton: false,
                        animation: false, 
                closeonconfirm: true 
            });
            $scope.normal_size = true;
            $scope.editing = false;

            $scope.getPosts();
        }, function(err) {
            $scope.sendingPost = false;
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

    $scope.vote = function(post, positive) {
        $http.post(api_host+'/api/posts/'+post.id+'/vote',{
            positive: positive
        }).success(function(data) {
            $scope.getPosts();
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

    $scope.reply = function(post) {
        post.isReplying = true;
        
        $scope.toShare = post;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'commentModal.html',
            controller: 'CommentCtrl',
            resolve: {
                post: function () {
                    return post;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.getPosts();
        }, function () {

        });
        
    };

    $scope.cancelReply = function(post) {
        post.isReplying = false;
    };


    $scope.openSocialModal = function(post) {
        $scope.toShare = post;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'postShareModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                }
            }
        });
    };
}])
.controller('CommentCtrl', function ($scope, $uibModalInstance, $http, $sce, $timeout, api_host, post, Post, Upload) {

    $scope.post = post;

    $scope.comment = new Post({});
    $scope.sendingPost = false;

    $scope.submitComment = function() {
        if($scope.sendingPost) {
            return;
        }
        $http.post(api_host+'/api/posts/'+$scope.post.id+'/comment',{
            content: $scope.comment.content,
            media_id: $scope.comment.media_id,
            media_type: $scope.comment.media_type,
            media_path: $scope.comment.media_path

        }).success(function(data) {
            $scope.sendingPost = false;
            $scope.comment = new Post({});
            $scope.post = data;
            $scope.comment = new Post({});
            $uibModalInstance.close(true);
        })
        .error(function(error) {
            $scope.sendingPost = false;
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
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
                        $scope.comment.media_type = 'VIDEO';
                        $scope.comment.media_path = result;
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
                    $scope.comment.media_id = response.data.media_id;
                    $scope.comment.media_type  = 'IMAGE';
                    $scope.comment.media_path = response.data.filename;
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



})
.controller('winwin-campanada', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Winwin', 'api_host', function($scope, $http, $state, $stateParams, $timeout, Winwin, api_host) {

    $scope.campanada_view = true;
    $scope.campanada_success = false;

    $scope.sentCampanada = function() {
        console.log('sent-campanada');
        $http.post('/api/winwins/campanada/'+$scope.winwin.id,
             {body: $scope.body}
        )
        .success(function(data) {
            $scope.campanada_success = true;
            $timeout(function () {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }, {reload: true}); 
            }, 1000);

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
.controller('winwin-poll', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Poll', 'api_host', function($scope, $http, $state, $stateParams, $timeout, Poll, api_host) {

    $scope.poll_view = true;
    $scope.poll_success = false;
    $scope.poll = {
        selected: 1
    };

    $scope.submitPoll = function() {
        $http.post('/api/winwins/'+$scope.winwin.id+'/poll',
            $scope.poll
        )
        .success(function(data) {
            $scope.poll_success = true;
            $timeout(function () {
                $state.go('winwin-view', {
                    winwinId: $scope.winwin.id
                }, {reload: true}); 
            }, 1000);

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
                text: 'Solicitud al sponsor enviada', 
                type: "info",
                showcancelbutton: false,
                        animation: false, 
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
.controller('winwin-config', ['$scope','$http', '$state', '$stateParams', 'api_host', 'Winwin', function($scope, $http, $state, $stateParams, api_host, Winwin) {

    $scope.all_notifications = false;

    $scope.toggleNotifications = function() {
        console.log('toggle');
        $scope.all_notifications = !$scope.all_notifications;
        if($scope.all_notifications) {
            $scope.winwin.notification_user_post = true;
            $scope.winwin.notification_new_participant = true;
            $scope.winwin.notification_new_poll  = true;
            $scope.winwin.notification_announce = true;
            $scope.winwin.notification_new_sponsor = true;
            $scope.winwin.notification_closing_date = true;
        }
    };

    $scope.updateNotifications = function() {
        $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/notifications', {
            notification_user_post: $scope.winwin.notification_user_post,
            notification_new_participant: $scope.winwin.notification_new_participant,
            notification_new : $scope.winwin.notification_new_poll,
            notification_announce: $scope.winwin.notification_announce,
            notification_new_sponsor: $scope.winwin.notification_new_sponsor,
            notification_closing_date: $scope.winwin.notification_closing_date
        })
        .success(function(data) {
            swal({
                title: "Info", 
                text: 'Notificaciones actualizadas', 
                type: "info",
                showcancelbutton: false,
                        animation: false, 
                closeonconfirm: true 
            });

        })
    };

    $scope.closeWinwin = function() {
        swal({
            title: "SOLICITAR BAJA WINWIN",
            text: "Contanos tus motivos",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: true,
            inputPlaceholder: "" 
        },
        function(inputValue){   
            if (inputValue === false) 
                return false;      
            if (inputValue === "") {     
                return false;  
            }      
            $http.post(api_host+'/api/winwins/'+$scope.winwin.id+'/close', {
                body: inputValue
            })
            .success(function(data) {
                swal({
                    title: "Info", 
                    text: 'Winwin cerrado', 
                    type: "info",
                    showCancelButton: false,
                    closeOnConfirm: true 
                });
                $state.go('main'); 
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
.controller('ModalMailCtrl', function ($scope, $uibModalInstance, $http, $timeout, api_host, toShare, mails) {

    $scope.toShare = toShare;
    $scope.success = false;
    $scope.mails = [];
    $scope.current_mail = '';

    $scope.addMail = function() {
        if(!$scope.current_mail) {
            return;
        }
        if($scope.matchEmail($scope.current_mail)) {
            $scope.mails.push($scope.current_mail);
            $scope.current_mail = ''; 
        }
    };
    $scope.removeMail = function(mail) {
        $scope.mails = _.without($scope.mails, mail);
    };

    $scope.sentInvitations = function() {
        $http.post(api_host+'/api/winwins/'+$scope.toShare.id+'/share/mails', {
            mails: $scope.mails
        }).success(function(data) {
            $scope.success = true;
            $timeout(function() {
                $uibModalInstance.close();
            }, 2000);
        });
    };

    $scope.matchEmail = function(email){
        var p = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return (email.match(p));
    }

})

;

