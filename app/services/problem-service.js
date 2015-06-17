define(['./module'], function (services) {
    'use strict';
    /**
     * - getUserProblemsFromDb
     * - getAllProblemsFromDb
     * - getProblemByIdFromDb
     *
     *
     */

    services.factory('ProblemService', function ($http, ipCookie) {
        return{
            getUserProblemsFromDb: function (userId) {
                return $http({ method: 'GET', url: "http://www.ecomap.org/api/usersProblem/" + userId });

            },
            getAllProblemsFromDb:function() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/v1/allproblems'
                });
            },
            getProblemByIdFromDb:function(problemId) {
                return $http.get("http://www.ecomap.org/api/problems/" + problemId);

            },
            deletePhotoFromdb:function(link){
                return $http.delete("http://www.ecomap.org/api/photo/"+link);

            }

        }


    });

});
