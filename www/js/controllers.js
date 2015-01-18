
var app = angular.module('controllers', ['ionic', 'dbService', 'LocalForageModule'])

app.controller('WorkoutCtrl', ['$scope', 'dbFactory', '$state', function($scope, dbFactory, $state) {
    
    
    $scope.runProgram = function(data) {
        var param = {id: data};
        $state.go('run_program',param);
        
    };
        
    $scope.getWorkouts = function () {
        dbFactory.getWorkouts(function(data) {
            $scope.workouts = data;
        });
    };
    $scope.getWorkouts();
    
    
}]);  // end of WorkoutCtrl

app.controller('SettingsCtrl', ['$scope', 'dbFactory', function($scope, dbFactory) {
    
    $scope.data = {};
    
    $scope.unitOptions = dbFactory.getUnitOptions();
    
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
    
    $scope.mfpToggle = function () {
        if ($scope.mfpConnected) {
            $scope.mfpConnected = false;
        } else {
            $scope.mfpConnected = true;
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
    
}]);  // end of SettingsCtrl


app.controller('ProfileCtrl', ['$scope', 'dbFactory', function($scope, dbFactory) {
                                   
    $scope.data = {};
                                   
    $scope.sexOptions = dbFactory.getSexOptions();
                                       
    $scope.getProfile = function () {
        dbFactory.getProfile(function(data) {
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
    $(".form_buttons").hide();

}]);  // end of ProfileCtrl

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
    
    
}]);  // end of SummaryCtrl

app.controller('RunProgramCtrl', ['$scope', '$interval', 'TimerService', '$stateParams', 'dbFactory', function($scope, $interval, TimerService, $stateParams, dbFactory) {
    var timer_id;

    var index = $stateParams.id;
    $scope.workout = {};
    
    $scope.init = function () {
        dbFactory.getWorkouts(function(data) {
            $scope.workout = data[index];
            timer_id = 0;
            $scope.myTimer = "0:00"
            $scope.remainingTime = TimerService.init($scope.workout.total_duration);
        });

    };
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

    };

    $scope.stopTimer = function() {
        $interval.cancel(timer_id);
        timer_id = 0;
    };
    


    
}]);  // end of RunProgramCtrl