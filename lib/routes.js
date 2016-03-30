if(Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('main');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}


FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId())
	{
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/',{
	name: 'home',
	action(){
		if(Meteor.userId()){
			FlowRouter.go('main');
		}
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/main',{
	name: 'main',
	action(){
		BlazeLayout.render('MainLayout',{main:'dashboard'});
	}
});