/**
 * Created by chuanlong on 2014/12/13.
 */
myApp.factory('wxKeyApi', function ($resource) {
    return $resource('/api/key/:page', {}, {
        total:{method:'GET',params:{},isArray:false},
        getAll:{method:'GET',params:{},isArray:true},
        get: {method: 'GET', params: {}, isArray: true},
        post:{method:'POST',params:{},isArray:false},
        put:{method:'PUT',params:{},isArray:false}
    });
});
myApp.factory('wxClassApi', function ($resource) {
    return $resource('/api/class/:page', {}, {
        getAll:{method:'GET',params:{},isArray:true},
        total: {method: 'GET', params: {}, isArray: false},
        get: {method: 'GET', params: {}, isArray: true},
        post: {method: 'POST', params: {}, isArray: false},
        put: {method: 'PUT', params: {}, isArray: false}
    });
});