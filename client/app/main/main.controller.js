'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.links = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('link');
    });
  }

  $onInit() {
    this.$http.get('/api/links').then(response => {
      this.links = response.data;
      this.socket.syncUpdates('link', this.links);
    });
  }

  addLink() {
    if (this.newLink) {
      this.$http.post('/api/links', { title: this.newLink.title, url: this.newLink.url, user: this.getCurrentUser()._id });
      this.newLink = '';
    }
  }

  deleteLink(link) {
    this.$http.delete('/api/links/' + link._id);
  }
}

angular.module('redditoApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
