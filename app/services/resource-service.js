define(['./module'], function (services) {
    'use strict';
    /**
     * - getResourceFromDb
     * - editResourceAndSaveToDb
     * - addResourceToDb
     * - getTitlesFromDb
     * - deleteResource
     *
     */

    services.factory('ResourceService', function ($http, ipCookie) {
        return{
            getResourceFromDb:function(Alias){
                return $http.get('http://www.ecomap.org/api/resources/' + Alias);

            },
            editResourceAndSaveToDb:function(Id,data){
                return $http.put('http://www.ecomap.org/api/editResource/' + Id,data);
            },
            addResourceToDb:function(data){
                return $http.post('http://www.ecomap.org/api/addResource', data);
            },
            getTitlesFromDb:function() {
                return $http({ method: 'GET', url: 'http://www.ecomap.org/api/getTitles' })
            },
            deleteResource:function(id){
                return $http.delete('http://www.ecomap.org/api/deleteResource/' + id);
            }




        }


    });

});