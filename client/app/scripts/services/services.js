angular.module('winwinsApp')
.factory('Group',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/groups/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
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
.factory('WinwinPaginate',['$http', 'api_host', function($http, api_host){
    var WinwinPaginate = function() {
        this.items = [];
        this.busy = false;
        this.current_page = 0;
    };

    WinwinPaginate.prototype.nextPage = function() {
        console.log('next page');
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

}]);    

