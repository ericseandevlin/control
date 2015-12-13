$(function() {
  console.log('js loaded');
});

angular.module('Heroes', []).directive('ngheroes', function() {
  return {

    controllerAs: 'heroes',
    controller: ['$http', function UsersCtrl($http) {

      this.$http = $http;

      var self = this;
      self.users = [];
      self.totalUsers = 0;
      self.user = {};
      self.newUser = {};

      self.guns = [];
      self.totalGuns = 0;
      self.gun = {};
      self.newGun = {};

      // ==================
      // get all users
      // ==================
      this.getUsers = function() {
        console.log('getting all users');
        // request to get all users
        self.$http.get('/users').then(function(response) {
          self.users = response.data;
          for (var i=0; i<self.users.length; i++){
            self.users[i].show = true;
          };
          console.log(self.users);
        });
        // return self.users;
      };
      this.getUsers();

      // ==================
      // new user
      // ==================
      this.newUser = function() {
        console.log('creating a user');
        // saves to db makes session cookie
        self.$http.post('/signup', {
          username: this.formUsername,
          password: this.formPassword,
          profile_img: this.formImg,
        }).then(function success(response) {
          console.log("saved in db", response);

          // Empty form
          self.formUsername = '';
          self.formPassword = '';
          self.formImg = '';
        }); // end http post
      }; // end newUser

      // ==================
      // login user
      // ==================
      this.login = function() {
        console.log('creating a user');
        // finds user makes session cookie
        self.$http.post('/login', {
          username: this.formUsername,
          password: this.formPassword,
        }).then(function success(response) {
          console.log("found in db", response);

          // Empty form
          self.formUsername = '';
          self.formPassword = '';
        }); // end http post
      }; // end login

      // ==================
      // logout user
      // ==================
      this.logout = function() {
        console.log('logging out');
        // deletes cookie
        Cookies.remove('loggedinId');
      }; // end logout

      // ==================
      // get all guns
      // ==================
      this.getGuns = function() {
        console.log('getting all guns');
        // request to get all users
        self.$http.get('/guns').then(function(response) {
          // self.guns = response.data;

          console.log(response);



          for (var i=0; i<self.guns.length; i++){
            self.guns[i].show = true;
          };
          // console.log(self.guns);
        });
        // return self.guns;
      };
      this.getGuns();



    }] // close controller
  }; // close return
}) // close angular module
