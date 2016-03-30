PostsList= new Mongo.Collection('posts');


if (Meteor.isClient) {
  // counter starts at 0

  Template.addPostForm.helpers({
     'photo' : function(){
        return Session.get('photo');
    }
  });

  Template.showPostList.helpers({
    posts: function () {
      return PostsList.find({},{sort: {createdAt: -1}});
    }
  });

  Template.addPostForm.events({
    'submit form': function (event) {
      event.preventDefault();
      var title = event.target.title.value;
      var photo = Session.get('photo');
      event.target.title.value = "";
      Session.set('photo', undefined)
      PostsList.insert({
        title: title,
        photo: photo,
        createdAt: new Date()
      });
    },
    'click .js-attach-image': function() {
        MeteorCamera.getPicture({width: 320}, function(error, data) {
          if (error)
            alert(error.reason);
          else
            Session.set('photo', data);
        });
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
