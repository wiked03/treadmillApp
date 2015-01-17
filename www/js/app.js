
var gTimer = "2:00";

var app = angular.module('treadmillManager', ['ionic', 'controllers', 'services', 'dbService'])

.run(function($ionicPlatform, dbFactory) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
        
        dbFactory.getProfile(function(data) {
            if (!data) {
                alert('yay not there');
                dbFactory.initDB();
            }
        });
        //dbFactory.initDB();

	});
});



app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
    
    openFB.init({appId: '750672561675225'});
    
    $urlRouterProvider.otherwise('/')

    $stateProvider
    .state('main', {
        url: '/',
        templateUrl: 'main.html'
    })

    .state('workout', {
        url: '/workout',
        templateUrl: 'workout.html'
    })

    .state('programs', {
        url: '/programs',
        templateUrl: 'programs.html'
    })

    .state('settings', {
        url: '/settings',
        templateUrl: 'settings.html'
    })
    
    .state('profile', {
        url: '/profile',
        templateUrl: 'profile.html'
    })

    .state('run_program', {
        url: '/run_program',
        templateUrl: 'run_program.html'
    })
    
    .state('summary', {
        url: '/summary',
        templateUrl: 'summary.html'
    })
});
