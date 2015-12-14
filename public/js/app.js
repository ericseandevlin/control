$(function() {
  console.log('js loaded');
});

angular.module('Heroes', []).directive('ngheroes', function() {
  return {

    controllerAs: 'heroes',
    controller: ['$http', function UsersCtrl($http) {

      this.$http = $http;

      var self = this;
      self.player = [];

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
          // console.log(self.users);
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
          // this.showStatus();
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
          console.log("logged  in response ", response.data);
          // this.showStatus();
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
      // show status
      // ==================
      this.showStatus = function() {
        console.log('getting status');
        var id = Cookies.get('loggedinId');
        self.$http.get('/user/'+id).then(function(response) {
          self.player = response.data;
        });
      };
      this.showStatus();

      // ==================
      // get all guns
      // ==================
      this.getGuns = function() {
        console.log('getting all guns');
        // request to get all users
        self.$http.get('/guns').then(function(response) {
          // console.log(response.data);
          var firearms = response.data;

          // sets value displayed in shop the initial value or one given by a player
          for (var i=0; i<firearms.length; i++){
            firearms[i].shop_value = 0;
            if ( firearms[i].given_value === null ) {
              firearms[i].shop_value = firearms[i].init_value;
            } else if ( firearms[i].given_value != null ) {
              firearms[i].shop_value = firearms[i].given_value;
            };
          };
          self.guns = firearms;
        });
      };
      this.getGuns();

      // ==================
      // buy guns
      // ==================
      // find gun info in guns array
      this.getGun = function(gunId) {
        for (i=0; i<self.guns.length; i++) {
          if (self.guns[i]._id === gunId) {
            return self.guns[i];
          };
        };
      };

      // compare the gun value with available points
      this.buy = function(gunId) {
        console.log("buying gun");

        var gunToBuy = this.getGun(gunId);

        if (gunToBuy > self.player.points) {
          console.log("you can't afford this");
        } else {

          // GUN http req --------------
          // set gun forSale to false
          // add user id as gun owner
          gunToBuy.forSale = false;
          gunToBuy.owner = Cookies.get('loggedinId');

          console.log(gunToBuy);

          var gunId = gunToBuy._id;

          self.$http.put('/gun/'+gunId, gunToBuy).then(function(response) {
            console.log("gun updated");
            console.log(response);
          });

          // USER http req -------------
          var playerId = Cookies('loggedinId');

          // subtract the value from the points
          var newPoints = self.player.points - gunToBuy.shop_value;

          // add gun to user's guns array
          self.$http.put('/user/'+playerId, {
            points: newPoints,
            newGun: gunToBuy,
          }).then(function(response) {
            console.log("player's points and gun added");
            console.log(response);
          });

          // prompt to equip

        }; // end if/else

      }; // end buy

      // ==================
      // equip gun
      // ==================
      this.equip = function() {
        console.log("equipping gun");

        // move a gun from user's guns array to user's equipped
      }

      // ==================
      // attack
      // ==================
      this.attack = function() {
        console.log("attacking");

        // subtract damage amount from victim's points

        // add random self-defense damage to attacker from victim?
      }

      // ==================
      // check for death
      // ==================
      this.death = function() {
        console.log("ckecking for death");

        // if victim points = 0 update kill status, background-color to red, remove attack button.

        // if player points = 0, update status to say 'you are dead'
      }

    }] // close controller
  }; // close return
}) // close angular module
