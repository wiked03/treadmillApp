
var app = angular.module('controllers', ['ionic', 'dbService', 'LocalForageModule'])



app.controller('SettingsCtrl', ['$scope', 'dbFactory', '$ionicModal', function($scope, dbFactory, $ionicModal) {
    
    $scope.data = {};
    
    $scope.getSettings = function () {
        dbFactory.getSettings(function(data) {
            $scope.data = data;
        });
    
    };
                                     
    $scope.enableEdit = function() {
        $(".form_input").prop('disabled', false);
        $(".form_buttons").show();
    };
    
    $scope.cancelEdit = function() {
        $(".form_input").prop('disabled', true); 
        $(".form_buttons").hide();
        dbFactory.getSettings(function(data) {
            $scope.data = data;
        });
    };                

    $scope.editSettings = function() {
        dbFactory.setSettings($scope.data, function() {});
        $(".form_input").prop('disabled', true); 
        $(".form_buttons").hide();
    }; 
    
    $scope.fbToggle = function () {
        if ($scope.fbConnected) {
            $scope.fbLogout();
            $scope.fbConnected = false;
        } else {
            $scope.fbLogin();
            $scope.fbConnected = true;
        }
    };
    
    $scope.fbLogin = function() {
        alert('login function fired');
        openFB.login(
            function(response) {
                if (response.status === 'connected') {
                    alert('Facebook login succeeded');
                    $scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            },
            {scope: 'email,publish_actions'});
    };
    
    $scope.fbLogout = function() {
        alert('logout function fired');
        openFB.logout(
            function(response) {
                alert("logged out");
            });
    };
    
    $scope.getSettings();
    $(".form_buttons").hide();
    
}]);


app.controller('ProfileCtrl', ['$scope', 'dbFactory', '$ionicModal', '$localForage', 
                               function($scope, dbFactory, $ionicModal, $localForage) {
                                   
    $scope.data = {};
                                       
    $scope.getProfile = function () {
        dbFactory.getProfile(function(data) {
            $scope.data = data;
        });
    
    };
    
    $scope.enableEdit = function() {
        $(".form_input").prop('disabled', false);
        $(".form_buttons").show();
        //document.getElementsByClassName('form_buttons').style.display = "block";
    };
    
    $scope.cancelEdit = function() {
        $(".form_input").prop('disabled', true); 
        $(".form_buttons").hide();
        dbFactory.getProfile(function(data) {
            $scope.data = data;
        });
    }; 
                       

    $scope.editProfile = function() {
        dbFactory.setProfile($scope.data, function() {});
        $(".form_input").prop('disabled', true); 
        $(".form_buttons").hide();
    };                                
                                   
                                   
    $scope.getProfile();

}]);

app.controller('SummaryCtrl', ['$scope', function($scope) {
    
    $scope.fbShare = function(event) {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: "testing my app" 
            },
            success: function () {
                alert('The session was shared on Facebook');
            },
            error: function () {
                alert('An error occurred while sharing this session on Facebook');
            }
        });
    }
    
    
}]);

app.controller('TimerCtrl', ['$scope', '$interval', 'TimerService', function($scope, $interval, TimerService) {
    var timer_id;

    $scope.init = function () {
        timer_id = 0;
        $scope.myTimer = "0:00"
        $scope.remainingTime = TimerService.init();
    }
    $scope.init();

    $scope.startTimer = function() {

        run_timer = function() {
            $scope.myTimer = TimerService.tickUp();
            $scope.remainingTime = TimerService.tickDown();
            if ($scope.remainingTime == "0:00") {
                //done
                $interval.cancel(timer_id);
                timer_id = 0;
            }
        }
        if (timer_id == 0) {
            timer_id = $interval(run_timer, 1000);
        }

    }

    $scope.stopTimer = function() {
        $interval.cancel(timer_id);
        timer_id = 0;
    }
}]);