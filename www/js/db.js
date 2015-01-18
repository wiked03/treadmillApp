var app = angular.module('dbService', ['LocalForageModule'])


app.factory('dbFactory', ['$localForage', function($localForage) {
   
    var defaultProfile = {name: "Name",sex: "Male",height: 72,weight: 180};
    var unitOptions = ["Imperial", "Metric"];
    var sexOptions = ["Male", "Female"];
    
    var defaultSettings = {fbConnected: false,mfpConnected: false,units: "Imperial"};
    
    var workouts = [{
        id: 0,
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
    },
    {
        id: 1,
        desc: "30 Minute",
        total_duration: 1800,
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
            {id: 17, duration: 180, speed: 6.0, incline: 3.0}
        ]
    }];
    
    var programs = [
        {id: 0, desc: "10 Week, 6 Mile Trainer", workouts: 
         [{id: 0,
           desc: "Week 1, Day 1",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}   
           ]
         },
         { id: 1,
           desc: "Week 1, Day 2",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}
           ]
         },
         { id: 1,
           desc: "Week 1, Day 3",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}
           ]
         }]
    }, {id: 1, desc: "5 Week, 3 Mile Trainer", workouts: 
         [{id: 0,
           desc: "Week 1, Day 1",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}   
           ]
         },
         { id: 1,
           desc: "Week 1, Day 2",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}
           ]
         },
         { id: 1,
           desc: "Week 1, Day 2",
           total_duration: 630,
           intervals: [
               {id: 1, duration: 180, speed: 4.0, incline: 0.0},
               {id: 2, duration: 180, speed: 6.0, incline: 0.0},
               {id: 3, duration: 60, speed: 7.0, incline: 0.0},
               {id: 4, duration: 180, speed: 6.5, incline: 1.0},
               {id: 5, duration: 30, speed: 8.0, incline: 1.0}
           ]
         }]
    }];
    
    
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
            $localForage.setItem('settings', defaultSettings);
            $localForage.setItem('workouts', workouts);
            $localForage.setItem('programs', programs);            
        },
        getUnitOptions: function() { return unitOptions; },
        getSexOptions: function() { return sexOptions; },
        getWorkouts: function(callback) {
            $localForage.getItem('workouts').then(callback);
        },
        getPrograms: function(callback) {
            $localForage.getItem('programs').then(callback);
        }
    };
    
}]);


function successCB() {};
function errorCB(msg) {alert("setProfile error " + msg)};

