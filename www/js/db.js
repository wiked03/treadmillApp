var app = angular.module('dbService', ['LocalForageModule'])


app.factory('dbFactory', ['$localForage', function($localForage) {
   
    var defaultProfile = {name: "Name",sex: "Male",height: 72,weight: 180};
    
    var settings = {fbConnected: false,mfpConnected: false,units: "US"};
    
    var workout = {
        id: 1,
        desc: "45 Minute, 5 Mile",
        total_duration: 2700,
        intervals: [
            {id: 1, duration: 180, speed: 4.0, incline: 0.0},
            {id: 2, duration: 180, speed: 6.0, incline: 0.0},
            {id: 3, duration: 60, speed: 7.0, incline: 0.0},
            {id: 4, duration: 180, speed: 6.5, incline: 1.0},
            {id: 5, duration: 30, speed: 8.0, incline: 1.0},
            {id: 6, duration: 180, speed: 6.5, incline: 1.0},
            {id: 7, duration: 30, speed: 8.0, incline: 1.0},
            {id: 8, duration: 60, speed: 4.0, incline: 1.0},
            {id: 9, duration: 30, speed: 8.0, incline: 2.0},
            {id: 10, duration: 180, speed: 6.5, incline: 2.0},
            {id: 11, duration: 30, speed: 8.0, incline: 2.0},
            {id: 12, duration: 180, speed: 6.5, incline: 2.0},
            {id: 13, duration: 30, speed: 9.0, incline: 2.0},
            {id: 14, duration: 60, speed: 4.0, incline: 2.0},
            {id: 15, duration: 180, speed: 6.0, incline: 3.0},
            {id: 16, duration: 30, speed: 9.0, incline: 3.0},
            {id: 17, duration: 180, speed: 6.0, incline: 3.0},
            {id: 18, duration: 30, speed: 9.0, incline: 3.0},
            {id: 19, duration: 90, speed: 3.0, incline: 2.0},
            {id: 20, duration: 30, speed: 8.0, incline: 2.0},
            {id: 21, duration: 180, speed: 6.0, incline: 2.0},
            {id: 22, duration: 30, speed: 8.0, incline: 1.0},
            {id: 23, duration: 180, speed: 6.0, incline: 1.0},
            {id: 24, duration: 60, speed: 7.0, incline: 1.0},
            {id: 25, duration: 180, speed: 6.0, incline: 0.0},
            {id: 26, duration: 120, speed: 4.0, incline: 0.0}
        ]
    };
    
    var workouts = [];
    workouts.push(workout);
    
    return {
        getProfile: function(callback) {
            $localForage.getItem('profile').then(callback);
        },
        setProfile: function(profile, callback) {
            $localForage.setItem('profile', profile).then(callback);
        },
        getSettings: function(callback) {
            $localForage.getItem('settings').then(callback);
        },
        setSettings: function(settings, callback) {
            $localForage.setItem('settings', settings).then(callback);
        },
        initDB: function() {
            $localForage.setItem('profile', defaultProfile);
            $localForage.setItem('settings', settings);
            $localForage.setItem('workouts', workouts);
            
        }
    };
    
}]);


function successCB() {};
function errorCB(msg) {alert("setProfile error " + msg)};

