$(function() {
  console.log('js loaded');
}); // close window loaded

angular.module('Heroes', []).directive('ngheroes', function() {
  return {

    controllerAs: 'heroes',
    controller: ['$http', function UsersCtrl($http) {

      this.$http = $http;

      var self = this;
      self.loginShow = false;
      self.signupShow = false;

      self.loggedIn = false;

      // keeps true on refresh;
      if (Cookies.get('loggedinId') != null || Cookies.get('loggedinId') != undefined) {
        self.loggedIn = true;
      };

      // shows equipped html if true
      self.equipped = false;

      self.player = [];
      self.activeGun = {};

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
          // for (var i=0; i<self.users.length; i++){
          //   self.users[i].show = true;
          // };
          // console.log(self.users);
        });
        // return self.users;
      };
      this.getUsers();


      // ==================
      // modals
      // ==================
      this.loginModal = function() {
        console.log("login modal");
        self.signupShow = false;
        self.loginShow = true;
      };

      this.signupModal = function() {
        console.log("signup modal");
        self.loginShow = false;
        self.signupShow = true;
      };

      this.closeModal = function() {
        self.loginShow = false;
        self.signupShow = false;
      }

      // ==================
      // new user
      // ==================
      this.newUser = function() {
        console.log('creating a user');

        self.activeGun = {};
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
          self.getUsers();
          self.getAUser();
          self.getGun(self.player.equipped);
          if (self.player.equipped != null || self.player.equipped != undefined) {
            self.equipped = true;
          } else {
            self.equipped = false;
          };
          self.loginShow = false;
          self.signupShow = false;
          self.loggedIn = true;
        }); // end http post
      }; // end newUser

      // ==================
      // login
      // ==================
      this.login = function() {
        console.log('creating a user');

        self.activeGun = {};
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
          self.getUsers();
          self.getAUser();
          self.getGun(self.player.equipped);
          if (self.player.equipped != null || self.player.equipped != undefined) {
            self.equipped = true;
          } else {
            self.equipped = false;
          };

          self.loginShow = false;
          self.signupShow = false;
          self.loggedIn = true;
        }); // end http post
      }; // end login

      // ==================
      // logout
      // ==================
      this.logout = function() {
        console.log('logging out');
        // deletes cookie
        Cookies.remove('loggedinId');
        self.getUsers();
        self.getAUser();
        self.loggedIn = false;
        self.equipped = false;
      }; // end logout


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
          self.$http.put('/usergun/'+playerId, {
            points: newPoints,
            newGun: gunToBuy,
          }).then(function(response) {
            console.log("player's points and gun added");
            console.log(response);
          });

          // prompt to equip

        }; // end if/else

        // update everything
        this.getAUser();
        this.getUsers();
        this.getGuns();
      }; // end buy

      // ==================
      // equip gun
      // ==================
      // adds gun id to user's equipped
      this.equip = function(gunId) {
        console.log("equipping gun");
        // console.log(gunId);

        // show any hidden guns in inventory
        for (i=0; i<self.player.guns.length; i++) {
          self.player.guns[i].show = true;
        }

        self.activeGun = this.getGun(gunId);

        // adds gun id into equipped
        // get gun object just to have object-filler to pass into $http
        self.$http.put('/equip/'+gunId, self.activeGun).then(function(response) {
          // returns gun id
          console.log("gun equipped");
          console.log(response);

          // unshow the equipped gun in inventory.
          for (i=0; i<self.player.guns.length; i++) {
            if (self.activeGun._id === self.player.guns[i]._id){
              self.player.guns[i].show = false;
            }
          }

          // updates player (and inventory)
          // shows equipped html
          self.equipped = true;
          self.player = response.data;
        });
      };

      // ==================
      // attack
      // ==================
      // subtract damage amount from victim's points
      this.attack = function(victim) {
        console.log("attacking");
        console.log(victim);

        var id = victim._id;

        victim.damage = self.activeGun.damage;

        self.$http.put('/attack/'+id, victim).then(function(response) {
          console.log("attack response ========")
          console.log(response);

          self.death(response);
        });
      };
        // add random self-defense damage to attacker from victim?

      // ==================
      // check for death
      // ==================
      //gets victim obj from attack function
      this.death = function(victim) {
        console.log("ckecking for death");

        // if victim points <= 0 update kill status, background-color to red, remove attack button.
        if (victim.data.points <= 0) {
          console.log(victim.data.username+" is dead");

          var id = Cookies.get('loggedinId');

          victim.newKills = self.player.kills + 1;
          newKills = self.player.kills + 1;

          // passing victim as a filler
          self.$http.put('/death/'+id, victim).then(function(response){
          });
        };
        // if player points = 0, update status to say 'you are dead'
        self.getUsers();
      };

      // ==================
      // show status
      // ==================
      this.getAUser = function() {
        console.log('getting status');
        var id = Cookies.get('loggedinId');
        self.$http.get('/user/'+id).then(function(response) {
          self.player = response.data;
          console.log("========");
          console.log(self.player);
          self.activeGun = self.getGun(self.player.equipped);
        });
      };
      this.getAUser();

    }] // close controller
  }; // close return
}) // close angular module
