define(['./module'], function (controllers) {

    'use strict';

    controllers.controller('ActivityCtrl', ['$scope', '$rootScope', '$routeParams','ActivityService', function ($scope,$rootScope, $routeParams,ActivityService) {

        $scope.addComment = function(comment) {
            ActivityService.postProblemComment(comment, $routeParams.problemID, $scope.userId)
                .success(function (data, status, headers, config) {
                    return $scope.loadComments();
                });
        };
        //TODO: Need to refactor this func
        /*$scope.deleteComment = function(commentId) {
            ActivityService.deleteCommentFromDB(commentId).then(function(){
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].Id==commentId) {
                        $scope.activities.splice(i,1);
                    }
                }

            });

        };*/
        $scope.loadComments = function() {
            ActivityService.getProblemComments($routeParams.problemID).success(function (data) {
                $scope.activities = data.data;
            });
        };
    }]);
});
