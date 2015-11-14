angular.module('winwinsApp')
.factory('Group',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/groups/:id', { id:'@id' }, {
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
}]).factory('User',['$resource', 'api_host', function($resource, api_host){
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
        this.current_page = 0;
    };

    WinwinPaginate.prototype.nextPage = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var self = this;
        $http.get(api_host+'/api/winwins/paginate/'+(this.current_page || '0')+'/15')
        .success(function(data) {
            self.current_page = self.current_page + 1;
            for (var i = 0; i < data.length; i++) {
                self.items.push(data[i]);
            }
            self.busy = false;
        });
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
            self.current_page = self.current_page + 1;
            for (var i = 0; i < data.length; i++) {
                self.items.push(data[i]);
            }
            self.busy = false;
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
            self.current_page = self.current_page + 1;
            for (var i = 0; i < data.length; i++) {
                self.items.push(data[i]);
            }
            self.busy = false;
        });
    };
    
    return SponsorPaginate; 

}])
.service('es_client',['esFactory', 'e_host', function(esFactory, e_host){
    console.log(e_host);
    return esFactory({
        host: e_host,
        log: 'trace',
        requestTimeout: 30000 ,
        apiVersion: '1.7'
    });
}]);
