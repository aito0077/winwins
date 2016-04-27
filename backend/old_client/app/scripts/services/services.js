angular.module('winwinsApp')
.factory('Group',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/groups/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Poll',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/polls/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Sponsor',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/sponsors/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Story',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/stories/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Account', ['$http', 'api_host', function($http, api_host) {
    return {
        getProfile: function() {
            return $http.get(api_host+'/api/me');
        },
        getStatus: function() {
            return $http.get(api_host+'/api/me/status');
        },
        updateProfile: function(profileData) {
            return $http.put(api_host+'/api/me', profileData);
        }
    };
}])
.factory('_Account', ['$http', '$rootScope', '$auth', '$location', 'api_host', function($http, $rootScope, $auth, $location, api_host) {
    return {
        profile: false,
        profile_id: false,
        fetching: false,
        roles: [],
        regions: [],
    
        getProfile: function(callback) {
            var self = this;
            if(!$auth.isAuthenticated()) {
                if(callback) {
                    self.listen(callback);
                }
                return;
            }
            if(self.profile) {
                if(callback) {
                    callback(self.profile);
                } else {
                    return this.profile;
                }
            }
            if(!self.fetching) {
                self.fetching = true;
                return $http.get(api_host+'/api/me').success(function(data){
                    self.fetching = false;
                    if(data.user == null) {
                        $auth.logout();
                        self.profile = false;
                        self.profile_id = false;
                        $rootScope.account = false;
                        self.broadcast();
                        $location.url('/');
                     } else {
                        self.profile = data.user; 
                        self.profile_id = self.profile.id;
                        $rootScope.account = self.profile;
                        self.regions = self.profile.regions;
                        self.roles = self.profile.roles;
                        self.broadcast();
                    }
                    if(callback) {
                        callback(self.profile);
                    }

                }).catch(function(response) {
                    $auth.logout();
                    self.profile = false;
                    self.profile_id = false;
                    self.broadcast();
                });
            } else {
                self.listen(callback);
            }
            return false;
        },

        hasRole: function(role_name) {
            var result = _.find(this.roles, function(role) {
                return role.name == role_name;
            });
            return result ? true : false;
        },

        logout: function() {
            if(!$auth.isAuthenticated()) {
                return;
            }
            this.profile = false;
            this.profile_id = false;
            $rootScope.account = false;
            this.broadcast();
            $auth.logout();
        },
        getStatus: function() {
            return $http.get(api_host+'/api/me/status');
        },
        updateProfile: function(profileData) {
            return $http.put(api_host+'/api/me', profileData);
        },
        broadcast: function() {
            $rootScope.$broadcast("account", this.profile);
        },
        listen: function(callback) {

            $rootScope.$on("account", function(event, newValue, oldValue) {
                if(newValue) {
                    callback(newValue);
                }
            });
        }
    };
}])
.factory('User',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/users/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Winwin',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/winwins/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Post',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/posts/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Comment',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/comments/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('ActivityType',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/parametric/activities/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Interest',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/parametric/interests/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Marital',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/parametric/marital/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Language',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/parametric/languages/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('TokenService',['$http', 'api_host', function($http, api_host){
        return {
            get: get
        };
 
        function get() {
            return $http.get(api_host+'/auth/token').then(
                success,
                fail
            );
        }
 
        function success(response) {
            return response;
        }
 
        function fail(response) {
            return response;
        }
}])
.factory('WinwinPaginate',['$http', 'api_host', function($http, api_host){
    var WinwinPaginate = function() {
        this.items = [];
        this.busy = false;
        this.filter = 'all';
        this.categories = false;
        this.current_page = 0;
        this.no_results = false;
    };

    WinwinPaginate.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var self = this;
        //if(self.categories instanceof Array && self.categories.length > 0) {
        if(self.categories) {
            $http.post(api_host+'/api/winwins/paginate/'+(this.current_page || '0')+'/15', {
                categories: self.categories
            })
            .success(function(data) {
                self.current_page = self.current_page + 1;
                for (var i = 0; i < data.length; i++) {
                    self.items.push(data[i]);
                }
                self.busy = false;
                self.no_results = (data.length == 0);
                console.log('no results: '+self.no_results);
            });
        } else {
            $http.get(api_host+'/api/winwins/paginate/'+(this.current_page || '0')+'/15/'+this.filter)
            .success(function(data) {
                self.current_page = self.current_page + 1;
                for (var i = 0; i < data.length; i++) {
                    self.items.push(data[i]);
                }
                self.busy = false;
                self.no_results = (data.length == 0);
                console.log('no results: '+self.no_results);
            });
        }
    };
    
    WinwinPaginate.prototype.setFilter = function(filter) {
        this.categories = false;
        this.filter = filter;
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    WinwinPaginate.prototype.setFilterByCategories = function(filters) {
        this.categories = filters;
        this.filter = 'all';
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    return WinwinPaginate; 

}])
.factory('GroupPaginate',['$http', 'api_host', function($http, api_host){
    var GroupPaginate = function() {
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    GroupPaginate.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var self = this;
        $http.get(api_host+'/api/groups/paginate/'+(this.current_page || '0')+'/15')
        .success(function(data) {
            self.current_page = self.current_page + 1;
            for (var i = 0; i < data.length; i++) {
                self.items.push(data[i]);
            }
            self.busy = false;
        });
    };
    
    return GroupPaginate; 

}])    
.factory('UserPaginate',['$http', 'api_host', function($http, api_host){
    var UserPaginate = function() {
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    UserPaginate.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var self = this;
        $http.get(api_host+'/api/users/paginate/'+(this.current_page || '0')+'/15')
        .success(function(data) {
            if(data.length == 0) {
                this.busy = true;
            } else {   
                self.current_page = self.current_page + 1;
                for (var i = 0; i < data.length; i++) {
                    self.items.push(data[i]);
                }
                self.busy = false;
            }
        });
    };
    
    return UserPaginate; 

}])
.factory('SponsorPaginate',['$http', 'api_host', function($http, api_host){
    var SponsorPaginate = function() {
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    SponsorPaginate.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var self = this;
        $http.get(api_host+'/api/sponsors/paginate/'+(this.current_page || '0')+'/15')
        .success(function(data) {
            if(data.length == 0) {
                this.busy = true;
            } else {   
                self.current_page = self.current_page + 1;
                for (var i = 0; i < data.length; i++) {
                    self.items.push(data[i]);
                }
                self.busy = false;
            }
        });
    };
    
    return SponsorPaginate; 

}])
/*
.service('es_client',['esFactory', 'e_host', function(esFactory, e_host){
    return esFactory({
        host: e_host,
        log: 'trace',
        requestTimeout: 30000 ,
        apiVersion: '1.7'
    });
}])
*/
;
