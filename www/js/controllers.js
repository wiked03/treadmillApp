
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

app.controller('ProgramCtrl', ['$scope', 'dbFactory', '$state', function($scope, dbFactory, $state) {
    
    $scope.programs = {}; 
    
    $scope.getProgramDetails = function(data) {
        var param = {id: data};
        $state.go('programDetails',param);
        
    };
        
    $scope.getPrograms = function () {
        dbFactory.getPrograms(function(data) {
            $scope.programs = data;
        });
    };
    $scope.getPrograms();
    
    
}]);  // end of ProgramCtrl


app.controller('ProgramDetailsCtrl', ['$scope', 'dbFactory', '$state', '$stateParams', function($scope, dbFactory, $state, $stateParams) {
        
    var index = $stateParams.id;
    $scope.workouts = {}; 
    
    $scope.runProgram = function(data) {
        var param = {id: data};
        $state.go('run_program',param);
        
    };
    
    $scope.getWorkouts = function () {
        dbFactory.getPrograms(function(data) {
            $scope.workouts = data[index].workouts;
        });
    };
    $scope.getWorkouts();
    
    
}]);  // end of ProgramDetailsCtrl

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
    var curr = 0;
    var ticks = 0;
    var tot_speed = 0;
    var tot_cal = 0;
    var distance = 0;
    var metric = false;

    $scope.workout = {};
    
    $scope.init = function () {
        dbFactory.getWorkouts(function(data) {
            $scope.workout = data[index];
            timer_id = 0;
            $scope.myTimer = "0:00"
            $scope.remainingTime = TimerService.init($scope.workout.total_duration);
            $scope.currSpeed = $scope.workout.intervals[curr].speed;
            $scope.currIncline = $scope.workout.intervals[curr].incline;
        });
        
        curr = 0;
        ticks = 0;
        tot_speed = 0;
        tot_cal = 0;
        distance = 0;
        metric = false;
        $scope.distance = 0;
        $scope.distanceUnit = 0;
        $scope.currSpeed = 0.0;
        $scope.currIncline = 0.0;
        $scope.calories = 0;
        
        
        dbFactory.getProfile(function(data) {
            $scope.weight = data.weight;
        });
        
        dbFactory.getSettings(function(data) {
            if (data.units == "Imperial") {
                $scope.distanceUnit = "mi";
                metric = false;
            } else {
                $scope.distanceUnit = "km";
                metric = true;
            }
        });

    };
    $scope.init();


    $scope.startTimer = function() {

        run_timer = function() {
            $scope.myTimer = TimerService.tickUp();
            $scope.remainingTime = TimerService.tickDown();
            ticks++;
            if (ticks >= $scope.workout.intervals[curr].duration) {
                ticks = 0;
				$scope.run_interval(curr);
				curr++;
                $scope.currSpeed = $scope.workout.intervals[curr].speed;
                $scope.currIncline = $scope.workout.intervals[curr].incline;
				ticks = 0;
			}
            
            if ($scope.remainingTime == "0:00") {
                //done
                $(".finish_button").show();
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
    

    $scope.calcInterval = function(time, speed, incline, weight) {
        var ox = 0;
        var cal_per_sec = 0;
        var i = incline / 100;  // convert to decimal form
        var s = 0;
        var w = 0;

        if (!metric) {
            // convert incoming metric
            s = speed * 26.8;   // meters per second
            w = weight / 2.2;   // kg
        }

        if(s < 3.7) {
            ox = (s * .1) + (1.8 * s * i) + 3.5;
        } else {
            ox = (s * .2) + (1.9 * s * i) + 3.5;
        }

        cal_per_sec = ((ox * w) / 200) / 60;

        return (cal_per_sec * time);

    };


    $scope.run_interval = function (i) {

        tot_speed = tot_speed + $scope.workout.intervals[i].speed;

        distance = distance + (($scope.workout.intervals[i].speed/3600) * $scope.workout.intervals[i].duration);
        if (metric) {
            $scope.distance = Math.round(distance * 100) / 100;
        } else {
            $scope.distance = Math.round((distance*1.609) * 100) / 100;
        }
        
        var avg_speed = tot_speed / (i+1);
        $scope.avgSpeed = Math.round(avg_speed * 100) / 100;

        tot_cal = tot_cal + $scope.calcInterval($scope.workout.intervals[i].duration, $scope.workout.intervals[i].speed, $scope.workout.intervals[i].incline, $scope.weight);
        $scope.calories = Math.round(tot_cal * 100) / 100;

    };
    
    $(".finish_button").hide();

    


    
}]);  // end of RunProgramCtrl