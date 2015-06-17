define(['./module'],function(services){
      'use strict';
    /**
     *  - socket
     *  - addNewsToDb
     *  - getNewsFromDb
     *  - deleteOneNewsItem
     *
     */
      services.factory('SocketService', function (socketFactory,$http) {
      var socket = socketFactory();
      socket.forward('broadcast');
      return {
          socket:socket,
          addNewsToDb:function(message){
              return $http.post('http://www.ecomap.org/api/postNews', {news: message})
              .success(function (data, status, headers, config) {
              })
              .error(function (data, status, headers, config) {
                  throw error;
              });

          },
          getNewsFromDb:function(uploadScope){
              return $http.get('http://www.ecomap.org/api/getNews',{})
              .success(function(data,status,headers,config){
                  uploadScope(data);

              })
              .error(function(data,status,headers,config){
                  throw error;
              });

          },

          deleteOneNewsItem:function(newsContent){
              return $http.post('http://www.ecomap.org/api/clearOneNews', {content:newsContent})
              .success(function (data, status, headers, config) {
              })
              .error(function (data, status, headers, config) {
                  throw error;
              });

          }
      };
  });
	
});
