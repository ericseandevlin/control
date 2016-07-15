# control
a game about gun control
-------

### LINKS

- Instructions:
	- https://github.com/ga-students/wdi_lettuce_students/blob/master/schedule.md
	- https://github.com/ga-students/wdi_lettuce_students/blob/master/projects/project4/project.md

- Project:
	- GitHub
		- https://github.com/ericseandevlin/control
	- Heroku
		- https://control-9000.herokuapp.com/
	- Trello link
		- https://trello.com/b/PGN4AQg9/control
	- Wireframes
		- https://drive.google.com/open?id=0B_SVqrLJRiUgSXRBTzF4Ni1GSWM

-------

### Git flow:

- Steps:
	- git clone
	- Create development branch
		- from master
			- git checkout -b development		
	- Pull @ beginning of day
		- from development
			- git pull origin master
			- (npm install) if needed
	- Create 1 branch per file task
		- from development
			- git checkout -b staging_file-feature
	- Push by end of day 
		- from branch
			- git add .
			- git commit -m "update details"
			- git checkout development
			- git pull origin devlopment (get latest updates)
			- git checkout branch
			- git merge development
			- correct any conflicts
			- git add .
			- git commit "merge development corrected"
			- git push origin name_feature
			- (gitHub
				- Pull request)
			- OR
			- (git push origin development)
			- git checkout development
		- from development
			- (gitHub
				- Pull request)
			- OR
			- git push origin master
	- merge end of day

-------

### REQUIREMENTS: (--o-- open) (--x-- complete)
 - A set of user stories which describe the scope of the app.
 - Wireframes describing the user experience for your site
 - For apps using relational data, you should try to incorporate an ERD (https://goo.gl/6VyXJ5) which describes the     relationships between models. This can be both a guide to creating the app, as well as a way to keep you on task.
 - A github repo
 - A link to the live site


-------


### PROGRAMS / FRAMEWORKS USED
 - Foundation
 	- main page layout (need to create)
 	- gun store layout http://foundation.zurb.com/templates-previews-sites-f5/store.html
 - Mean Stack


-------


### CONCEPT / LAYOUT
 - visually will be in the vein of doomsday survival blogs:http://www.shtfplan.com/   or   http://www.thesurvivalistblog.net/    or    https://www.doomsdayprep.com/

 - the concept is to only give users choices that will allow them to experience the unfairness and desperation that leads to isolation and violence. Similar to how the game Depression Quest allows the player to understand the limitations caused by depression experientially: http://www.depressionquest.com/
 
 - PLAYERS: you are trying to protect yourself and survive.
 - OBJECTIVE: stay alive.
  
### USER STORIES
 - all users begin with 100 points.
 - users can buy guns with their points.
 - all guns begin with initial set prices at the gun store.
 - there will initially only be a limited amount of guns at the gun store (around 20-30).
 - if there are no other guns at the gun store players can buy directly from other players.
 - players can buy or sell guns for any number of points.
 - players can use their guns to 'damage' other players and steal their points.
 - a player 'dies' and is out of the game if their points go below 0.
 - a dead player's guns return to the gun store for sale at their original prices.

 
 -------
 
 
### MODELS
 - users
	-  username: string
	-  password_hash: string
	-  profile_img: string
	-  points: number
	-  guns: foreign key ONE TO ONE	

 - guns
 	- gun_img: string
 	- init_value: number
 	- given_value: number
 	- damage: number

-------







