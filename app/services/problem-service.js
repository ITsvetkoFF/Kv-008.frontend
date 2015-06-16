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
                return $http({ method: 'GET', url: "api/usersProblem/" + userId });

            },
            getAllProblemsFromDb:function() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/v1/allproblems'
                });
            },
            getProblemByIdFromDb:function(problemId) {
                return $http.get("api/problems/" + problemId);

            },
            deletePhotoFromdb:function(link){
                return $http.delete("/api/photo/"+link);

            }

        }


    });

});
