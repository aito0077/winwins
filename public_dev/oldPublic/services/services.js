angular.module('wwApp')
.factory('Group',['$resource', function($resource){
    return $resource('/api/groups/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('User',['$resource', function($resource){
    return $resource('/api/users/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Winwin',['$resource', function($resource){
    return $resource('/api/winwins/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('ActivityType',['$resource', function($resource){
    return $resource('/api/parametric/activities/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Interest',['$resource', function($resource){
    return $resource('/api/parametric/interests/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Marital',['$resource', function($resource){
    return $resource('/api/parametric/marital/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])    
.factory('Language',['$resource', function($resource){
    return $resource('/api/parametric/languages/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}]);    

