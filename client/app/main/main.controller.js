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
    this.isEditable = {};

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('link');
    });
  }

  $onInit() {
    this.$http.get('/api/links').then(response => {
      this.links = response.data;
      for (var i = 0, length = this.links.length; i < length; i++) {
        this.isEditable[this.links[i]._id] = false;
      }
      this.socket.syncUpdates('link', this.links);
    });
  }

  editLink(link){
    this.isEditable[link._id] = !this.isEditable[link._id];
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

  updateLink(link) {
    this.$http.put('/api/links/' + link._id, { title: link.title, url: link.url, user: link.user });
    this.isEditable[link._id] = false;
  }
}

angular.module('redditoApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
